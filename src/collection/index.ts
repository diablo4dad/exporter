import { Category, Source } from './constants.js';
import { achievementToCollectionItems } from './parser/achievements.js';
import { extractItemFromProduct, storeToCollectionItems } from './parser/bundles.js';
import { challengeToCollection } from './parser/challenges.js';
import { CollectionDescriptor, D4DadCollection, D4DadCollectionItem, ItemList } from './struct.js';

import {
  isActor,
  isEmblem,
  isEmote,
  isItem,
  isMarkingShape,
  isPlayerTitle,
  isStoreProduct,
  isTownPortalCosmetic,
} from '../d4data/predicate.js';
import { resolveSno, resolveStoreProduct, resolveStringsList } from '../d4data/resolver.js';
import { D4Entity, D4Item, D4StoreProduct, D4Type } from '../d4data/struct.js';
import { getEntity, getEntityFuzzy } from '../d4reader/getter.js';
import { getTextFromStl } from '../d4reader/strings.js';
import { D4Dependencies } from '../d4reader/struct.js';
import { hashCode, identity, pipe } from '../helper.js';

export function aggregateItemList(deps: D4Dependencies) {
  return (il: ItemList): D4Entity[][] => {
    const collectionItems = [];

    if (il.items.length) {
      if (shouldItemsBeAggregated(il.items)) {
        collectionItems.push(il.items);
      } else {
        collectionItems.push(...il.items.map((i) => [i]));
      }
    }

    if (il.titles.length) {
      collectionItems.push(il.titles);
    }

    if (il.emotes.length) {
      collectionItems.push(il.emotes);
    }

    if (il.markings.length) {
      collectionItems.push(il.markings);
    }

    if (il.emblems.length) {
      collectionItems.push(...il.emblems.map((i) => [i]));
    }

    if (il.headstones.length) {
      collectionItems.push(...il.headstones.map((i) => [i]));
    }

    if (il.portals.length) {
      collectionItems.push(...il.portals.map((i) => [i]));
    }

    if (il.bundles.length) {
      const bundleItems = il.bundles.map(unpackStoreProduct(deps)).reduce(mergeItemLists, createItemList());

      return [...collectionItems, ...aggregateItemList(deps)(bundleItems)];
    }

    return collectionItems;
  };
}

export function buildCollection(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollection => {
    const challenges = descriptor.challengeFileFlatten ? [] : parseChallengeFile(deps)(descriptor);
    const postHook = descriptor.postHook ?? identity;
    const patches = descriptor.patches ?? [];

    const derivedNames = deriveCollectionNameAndDesc(deps)(descriptor);
    const name = descriptor.name ?? derivedNames[0];
    const description = descriptor.description ?? derivedNames[1];

    const collection: D4DadCollection = {
      id: Math.abs(hashCode(name + description)),
      name: name,
      description: description,
      category: descriptor.category,
      season: descriptor.season,
      outOfRotation: descriptor.outOfRotation,
      premium: descriptor.premium,
      collectionItems: parseCollectionItems(deps)(descriptor),
      subcollections: challenges.concat(...(descriptor.children?.map(buildCollection(deps)) ?? [])),
    };

    return pipe(collection, patchCollection(patches), postHook);
  };
}

export function composeName(deps: D4Dependencies) {
  return (...items: D4Entity[]): string => {
    return items
      .map((i) => {
        const itemStrings = resolveStringsList(i, deps.strings);

        const storeProduct = resolveStoreProduct(i, deps.storeProducts);
        const storeStrings = resolveStringsList(storeProduct, deps.strings);

        return getTextFromStl(itemStrings, 'Name', getTextFromStl(storeStrings, 'Name'));
      })
      .filter((v, i, self) => {
        return i == self.indexOf(v);
      })
      .join(', ');
  };
}

export function createItemList(): ItemList {
  return {
    titles: [],
    emblems: [],
    items: [],
    bundles: [],
    emotes: [],
    headstones: [],
    portals: [],
    markings: [],
  };
}

function shouldItemsBeAggregated(items: D4Item[]): boolean {
  if (items.length > 1) {
    const itemType = items[0].snoItemType?.__raw__;
    if (itemType) {
      return items.every((i) => i.snoItemType?.__raw__ === itemType);
    }
  }

  return false;
}

export function filterItemList(itemlist: ItemList): ItemList {
  const filterThese = ['SJCache'];

  return {
    ...itemlist,
    items: itemlist.items.filter((i) => !filterThese.includes(i.snoItemType?.name ?? '')),
  };
}

// ack!
export const generateId = (() => {
  let num = 15000;

  return () => {
    return (num += 1);
  };
})();

export function mergeItemLists(a: ItemList, b: ItemList): ItemList {
  return {
    titles: [...a.titles, ...b.titles],
    emblems: [...a.emblems, ...b.emblems],
    items: [...a.items, ...b.items],
    bundles: [...a.bundles, ...b.bundles],
    emotes: [...a.emotes, ...b.emotes],
    headstones: [...a.headstones, ...b.headstones],
    portals: [...a.portals, ...b.portals],
    markings: [...a.markings, ...b.markings],
  };
}

export function parseChallengeFile(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollection[] => {
    if (descriptor.challengeFile === undefined) {
      return [];
    }

    return pipe(
      getEntity(descriptor.challengeFile, deps.challenges),
      (c) => c.arCategories.map(challengeToCollection(deps)(c)),
      (c) => c.map(assignComputedValuesToCollection(descriptor, Source.CHALLENGE_FILE)),
    );
  };
}

function inferClaim(descriptor: CollectionDescriptor, source?: Source) {
  if (descriptor.category === Category.BATTLE_PASS) {
    switch (source) {
      case Source.CHALLENGE_FILE:
        return 'Battle Pass';
      case Source.STORE_PRODUCT:
        return 'Accelerated Battle Pass';
    }
  }

  if (descriptor.category === Category.SEASON_JOURNEY) {
    switch (source) {
      case Source.CHALLENGE_FILE:
        return 'Season Journey';
      case Source.ACHIEVEMENT:
        return 'Feat of Strength';
    }
  }

  if (descriptor.category === Category.PROMOTIONAL) {
    return 'Promotional';
  }

  if (source === Source.ACHIEVEMENT) {
    return 'Challenge';
  }

  if (source === Source.STORE_PRODUCT) {
    return 'Cash Shop';
  }

  if (descriptor.claim) {
    return descriptor.claim;
  }

  switch (descriptor.category) {
    case Category.LIMITED_EVENT:
      return 'Limited Event';
    case Category.PVP:
      return 'Vendor';
    case Category.ACTIVITY:
      return 'Activity';
    case Category.ARMOR:
    case Category.WEAPON:
      return 'World Drop';
    case Category.GENERAL:
      return 'General';
    case Category.SHOP_ITEMS:
      return 'Cash Shop';
    case Category.SEASONS:
      return 'Seasonal';
    case Category.CHALLENGE:
      return 'Challenge';
    case Category.BATTLE_PASS:
      return 'Battle Pass';
    case Category.SEASON_JOURNEY:
      return 'Season Journey';
    case Category.REPUTATION:
      return 'Reputation Board';
    case Category.ZONE:
      return 'Zone Drop';
    case Category.MONSTER_DROP:
      return 'Monster Drop';
    default:
      return 'Unknown';
  }
}

function checkPremium(descriptor: CollectionDescriptor, source?: Source) {
  if (descriptor.category === Category.BATTLE_PASS) {
    if (source === Source.STORE_PRODUCT) {
      return true;
    }
  }
}

function assignComputedValuesToItem(descriptor: CollectionDescriptor, source?: Source) {
  return (ci: D4DadCollectionItem): D4DadCollectionItem => ({
    ...ci,
    id: generateId(),
    claim: inferClaim(descriptor, source),
    claimDescription: ci.claimDescription ?? descriptor.claimDescription,
    premium: ci.premium ?? checkPremium(descriptor, source),
    outOfRotation: descriptor.outOfRotation,
  });
}

function assignComputedValuesToCollection(descriptor: CollectionDescriptor, source?: Source) {
  return (collection: D4DadCollection): D4DadCollection => ({
    ...collection,
    category: collection.category ?? descriptor.category,
    collectionItems: collection.collectionItems.map(assignComputedValuesToItem(descriptor, source)),
    subcollections: collection.subcollections.map(assignComputedValuesToCollection(descriptor, source)),
  });
}

export function parseCollectionItems(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollectionItem[] => {
    const challengesItems = descriptor.challengeFileFlatten
      ? parseChallengeFile(deps)(descriptor)
          .map((c) => c.collectionItems)
          .flat()
      : [];
    const storeItems = parseStoreFiles(deps)(descriptor);
    const achievementItems = parseAchievementFiles(deps)(descriptor);
    const extraItems = parseExtraItems(deps)(descriptor);

    return [...challengesItems, ...storeItems, ...achievementItems, ...extraItems];
  };
}

function parseStoreFiles(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollectionItem[] => {
    if (descriptor.storeProducts === undefined) {
      return [];
    }

    return descriptor.storeProducts
      .map((sp) => getEntity(sp, deps.storeProducts))
      .map(storeToCollectionItems(deps))
      .flat()
      .map(assignComputedValuesToItem(descriptor, Source.STORE_PRODUCT));
  };
}

function parseAchievementFiles(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollectionItem[] => {
    if (descriptor.achievements === undefined) {
      return [];
    }

    return descriptor.achievements
      .map((a) => getEntity(a, deps.achievements))
      .map(achievementToCollectionItems(deps))
      .flat()
      .map(assignComputedValuesToItem(descriptor, Source.ACHIEVEMENT));
  };
}

function parseExtraItems(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): D4DadCollectionItem[] => {
    return (descriptor.items ?? []).map((g) => {
      const items = g.map((i) => getEntityFuzzy(i, deps)).filter((v): v is D4Entity => v !== null);

      return {
        id: generateId(),
        name: composeName(deps)(...items),
        claim: descriptor.claim ?? inferClaim(descriptor),
        claimDescription: descriptor.claimDescription,
        items: items.map((i) => i.__snoID__),
      };
    });
  };
}

export function patchCollection(patches: Partial<D4DadCollectionItem>[]) {
  return (collection: D4DadCollection): D4DadCollection => ({
    ...collection,
    collectionItems: collection.collectionItems.map(patchCollectionItem(patches)),
    subcollections: collection.subcollections.map(patchCollection(patches)),
  });
}

function patchCollectionItem(patches: Partial<D4DadCollectionItem>[]) {
  return (collectionItem: D4DadCollectionItem): D4DadCollectionItem => {
    return patches
      .filter((patch) => patch.items?.every((i) => collectionItem.items.includes(i)) ?? false)
      .reduce(
        (a, c) => ({
          ...a,
          ...c,
        }),
        collectionItem,
      ) as D4DadCollectionItem;
  };
}

export function pushToItemList(itemList: ItemList, item?: D4Type): ItemList {
  if (item === undefined) {
    return itemList;
  }

  if (isPlayerTitle(item)) {
    return {
      ...itemList,
      titles: [...itemList.titles, item],
    };
  }

  if (isEmblem(item)) {
    return {
      ...itemList,
      emblems: [...itemList.emblems, item],
    };
  }

  if (isItem(item)) {
    return {
      ...itemList,
      items: [...itemList.items, item],
    };
  }

  if (isStoreProduct(item)) {
    return {
      ...itemList,
      bundles: [...itemList.bundles, item],
    };
  }

  if (isEmote(item)) {
    return {
      ...itemList,
      emotes: [...itemList.emotes, item],
    };
  }

  // headstones
  if (isActor(item)) {
    return {
      ...itemList,
      headstones: [...itemList.headstones, item],
    };
  }

  if (isTownPortalCosmetic(item)) {
    return {
      ...itemList,
      portals: [...itemList.portals, item],
    };
  }

  if (isMarkingShape(item)) {
    return {
      ...itemList,
      markings: [...itemList.markings, item],
    };
  }

  return itemList;
}

function deriveCollectionNameAndDesc(deps: D4Dependencies) {
  return (descriptor: CollectionDescriptor): [string, string] => {
    if (descriptor.storeProducts?.length) {
      const storeProductId = descriptor.storeProducts[0];
      const storeProductSno = deps.storeProducts.get(storeProductId);
      if (!storeProductSno) {
        throw new Error(storeProductId + ' not found');
      }

      const storeStrings = resolveStringsList(storeProductSno, deps.strings);

      const name = getTextFromStl(storeStrings, 'Name');
      const desc = getTextFromStl(storeStrings, 'Series');

      // do not infer description from shop bundle for promotions
      if (descriptor.category === Category.PROMOTIONAL) {
        return [name, ''];
      }

      return [name, desc];
    }

    return ['', ''];
  };
}

export function unpackStoreProduct(deps: D4Dependencies): (product: D4StoreProduct) => ItemList {
  return (product: D4StoreProduct): ItemList => {
    let itemList = createItemList();

    itemList = pushToItemList(itemList, extractItemFromProduct(deps)(product));

    product.arBundledProducts.forEach((bp) => {
      const innerProduct = resolveSno(bp, deps.storeProducts);
      if (innerProduct) {
        itemList = pushToItemList(itemList, extractItemFromProduct(deps)(innerProduct));
      }
    });

    product.arAddOnBundles.forEach((ao) => {
      const addOn = resolveSno(ao, deps.storeProducts);
      if (addOn) {
        itemList = mergeItemLists(itemList, unpackStoreProduct(deps)(addOn));
      }
    });

    return itemList;
  };
}
