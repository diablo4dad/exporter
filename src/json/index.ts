import {
  D4Actor,
  D4Dependencies,
  D4Emblem,
  D4Emote,
  D4Item,
  D4MarkingShape,
  D4PlayerTitle,
  D4Ref,
  D4StoreProduct,
  D4TownPortalCosmetic,
  D4Type,
  getEntity,
  getEntityFuzzy,
  getTextFromStl,
  isActor,
  isEmblem,
  isEmote,
  isItem,
  isMarking,
  isPortal,
  isStoreProduct,
  isTitle,
  resolveSno,
  resolveStoreProduct,
  resolveStringsList,
} from '../d4.js';
import { extractItemFromProduct, storeToCollectionItems } from './factory/bundles.js';
import { achievementToCollectionItems } from './factory/achievements.js';
import { hashCode, identity, pipe } from '../helper.js';
import { challengeToCollection } from './factory/challenges.js';

export const BODY_MARKING = 7200;
export enum Category {
  GENERAL = 'General',
  SHOP_ITEMS = 'Shop',
  PROMOTIONAL = 'Promotional',
  SEASONS = 'Season',
  CHALLENGE = 'Challenge',
  // sub-categories
  BATTLE_PASS = 'Battle Pass',
  SEASON_JOURNEY = 'Season Journey',
  REPUTATION = 'Reputation',
  ZONE = 'Zone',
  MONSTER_DROP = 'Monster Drop',
  LIMITED_EVENT = 'Limited Event',
  PVP = 'PvP',
  ACTIVITY = 'Activity',
  ARMOR = 'Armor',
  WEAPON = 'Weapon',
}
export type CollectionDescriptor = {
  name?: string;
  category?: Category;
  description?: string;
  season?: number;
  outOfRotation?: boolean;
  premium?: boolean;
  claim?: string;
  claimDescription?: string;
  children?: CollectionDescriptor[];
  postHook?: (collection: D4DadCollection) => D4DadCollection;
  patches?: Partial<D4DadCollectionItem>[];
  challengeFile?: string;
  challengeFileFlatten?: boolean;
  reputationFile?: string;
  storeProducts?: string[];
  achievements?: string[];
  items?: string[][];
};
export type D4DadAchievement = D4DadEntity & {
  rewards?: D4DadAchievementRewards;
};
export type D4DadAchievementRewards = {
  items?: number[];
  products?: number[];
};
export type D4DadChallenge = D4DadEntity & {
  categories: D4DadChallengeCategory[];
};
export type D4DadChallengeCategory = {
  name?: string; // move to translations somehow
  categoryId: number;
  categories?: D4DadChallengeCategory[];
  achievements?: number[];
};

export type D4DadCollection = {
  id: number;
  itemId?: number;
  name: string;
  season?: number;
  outOfRotation?: boolean;
  premium?: boolean;
  description?: string;
  category?: string;
  bundleId?: number;
  subcollections: D4DadCollection[];
  collectionItems: D4DadCollectionItem[];
};

export enum D4DadCollectionCategory {
  GENERAL = 'general',
  SEASONS = 'seasons',
  CHALLENGES = 'challenges',
  PROMOTIONAL = 'promotional',
  STORE = 'store',
}

export type D4DadCollectionItem = {
  id: number;
  name: string; // debug only

  claim: string;
  claimDescription?: string;
  claimZone?: string;
  claimMonster?: string;

  outOfRotation?: boolean;
  premium?: boolean;
  promotional?: boolean;
  season?: number;
  unobtainable?: boolean;

  items: number[];
};

export type D4DadDb = {
  itemTypes: D4DadItemType[];
  items: D4DadItem[];
  products: D4DadStoreProduct[];
  collections: D4DadCollection[];
  achievements: D4DadAchievement[];
  challenges: D4DadChallenge[];
};

export type D4DadEntity = {
  id: number;
  filename?: string;
};

export type D4DadGenderSpecificImages = [number, number];

export type D4DadItem = D4DadEntity & {
  itemType: number;
  icon: number;
  usableByClass?: number[];
  invImages?: D4DadGenderSpecificImages[];
  magicType?: number;
  isTransmog?: boolean;
};

export type D4DadItemType = D4DadEntity & {
  // nothing
};

export type D4DadStoreProduct = D4DadEntity & {
  item?: number;
  bundledProducts?: number[];
};

export type D4DadTranslation = {
  name?: string;
  description?: string;
  series?: string;
  transmogName?: string;
};

export type D4DadTranslations = Record<number, D4DadTranslation>;

export const EMBLEM = 7204;

export const EMOTE = 7201;
export const HEADSTONE = 7203;

export const ITEM_TYPE_APPENDAGE: [D4DadItemType, D4DadTranslation][] = [
  [{ id: 7200 }, { name: 'Body Marking' }],
  [{ id: 7201 }, { name: 'Emote' }],
  [{ id: 7202 }, { name: 'Town Portal' }],
  [{ id: 7203 }, { name: 'Headstone' }],
  [{ id: 7204 }, { name: 'Emblem' }],
  [{ id: 7205 }, { name: 'Player Title (Prefix)' }],
  [{ id: 7206 }, { name: 'Player Title (Suffix)' }],
];

export type ItemList = {
  titles: D4PlayerTitle[];
  emblems: D4Emblem[];
  items: D4Item[];
  bundles: D4StoreProduct[];
  emotes: D4Emote[];
  headstones: D4Actor[];
  portals: D4TownPortalCosmetic[];
  markings: D4MarkingShape[];
};

export const PLAYER_TITLE_PREFIX = 7205;

export const PLAYER_TITLE_SUFFIX = 7206;

export const TOWN_PORTAL = 7202;

export function aggregateItemList(deps: D4Dependencies) {
  return (il: ItemList): (D4Ref & D4Type)[][] => {
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
  return (...items: (D4Ref & D4Type)[]): string => {
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

enum Source {
  CHALLENGE_FILE,
  ACHIEVEMENT,
  STORE_PRODUCT,
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
    case Category.PROMOTIONAL:
      return 'Promotional';
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
    claimDescription: descriptor.claimDescription,
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
      const items = g.map((i) => getEntityFuzzy(i, deps));

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

  if (isTitle(item)) {
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

  if (isPortal(item)) {
    return {
      ...itemList,
      portals: [...itemList.portals, item],
    };
  }

  if (isMarking(item)) {
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
