import {
  D4Achievement,
  D4Actor,
  D4ChallengeCategory,
  D4ChallengeDefinition,
  D4Dependencies,
  D4Emblem,
  D4Emote,
  D4Item,
  D4MarkingShape,
  D4PlayerTitle,
  D4Ref,
  D4RewardDefinition,
  D4StoreProduct,
  D4TownPortalCosmetic,
  D4Type,
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
  stu
} from "../../d4.js";
import {
  D4DadChallenge,
  D4DadChallengeCategory,
  D4DadCollection,
  D4DadCollectionItem,
  D4DadTranslation
} from "../index.js";
import {extractItemFromProduct} from "../../strapi/factory/bundles.js";

export function challengeToDad(deps: D4Dependencies): (definition: D4ChallengeDefinition) => [D4DadChallenge, D4DadTranslation] {
  return (definition: D4ChallengeDefinition): [D4DadChallenge, D4DadTranslation] => {
    const challengeStringsList = resolveStringsList(definition, deps.strings);

    const mapCategory = (cat: D4ChallengeCategory): D4DadChallengeCategory => {
      const name = stu(getTextFromStl(challengeStringsList, "Challenge_Category_" + cat.dwID));
      const categoryId = cat.dwID;
      const categories = cat.arCategories.map(mapCategory);
      const achievements = cat.arAchievementSnos
        .map(a => resolveSno(a, deps.achievements))
        .map(a => a?.__snoID__)
        .filter(a => a !== undefined)
        .map(Number);

      return {
        name,
        categoryId,
        categories: categories.length ? categories : undefined,
        achievements: achievements.length ? achievements : undefined,
      };
    }

    const id = definition.__snoID__;
    const filename = definition.__fileName__;
    const categories = definition.arCategories.map(mapCategory);

    return [{
      id,
      filename,
      categories,
    }, {
      // empty
    }];
  }
}

type ItemList = {
  titles: D4PlayerTitle[],
  emblems: D4Emblem[],
  items: D4Item[],
  bundles: D4StoreProduct[],
  emotes: D4Emote[],
  headstones: D4Actor[],
  portals: D4TownPortalCosmetic[],
  markings: D4MarkingShape[],
}

function createItemList(): ItemList {
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

function mergeItemLists(a: ItemList, b: ItemList): ItemList {
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

function pushToItemList(itemList: ItemList, item?: D4Type): ItemList {
  if (item === undefined) {
    return itemList;
  }

  if (isTitle(item)) {
    return {
      ...itemList,
      titles: [...itemList.titles, item],
    }
  }

  if (isEmblem(item)) {
    return {
      ...itemList,
      emblems: [...itemList.emblems, item],
    }
  }

  if (isItem(item)) {
    return {
      ...itemList,
      items: [...itemList.items, item],
    }
  }

  if (isStoreProduct(item)) {
    return {
      ...itemList,
      bundles: [...itemList.bundles, item],
    }
  }

  if (isEmote(item)) {
    return {
      ...itemList,
      emotes: [...itemList.emotes, item],
    }
  }

  // headstones
  if (isActor(item)) {
    return {
      ...itemList,
      headstones: [...itemList.headstones, item],
    }
  }

  if (isPortal(item)) {
    return {
      ...itemList,
      portals: [...itemList.portals, item],
    }
  }

  if (isMarking(item)) {
    return {
      ...itemList,
      markings: [...itemList.markings, item],
    }
  }

  return itemList;
}

function unpackStoreProduct(deps: D4Dependencies): (product: D4StoreProduct) => ItemList {
  return (product: D4StoreProduct): ItemList => {
    let itemList = createItemList();

    itemList = pushToItemList(itemList, extractItemFromProduct(deps)(product));

    product.arBundledProducts.forEach(bp => {
      const innerProduct = resolveSno(bp, deps.storeProducts);
      if (innerProduct) {
        itemList = pushToItemList(itemList, extractItemFromProduct(deps)(innerProduct));
      }
    });

    return itemList;
  }
}

function rewardListToItemList(deps: D4Dependencies): (rewards: D4RewardDefinition) => ItemList {
  return (a: D4RewardDefinition): ItemList => {
    let itemList = createItemList();

    itemList = pushToItemList(itemList, resolveSno(a.snoItem, deps.items));
    itemList = pushToItemList(itemList, resolveSno(a.snoPlayerTitle, deps.playerTitles));
    itemList = pushToItemList(itemList, resolveSno(a.snoEmblem, deps.emblems));
    itemList = pushToItemList(itemList, resolveSno(a.snoStoreProduct, deps.storeProducts));

    return itemList;
  }
}

function shouldItemsBeAggregated(items: D4Item[]): boolean {
  if (items.length > 1) {
    const itemType = items[0].snoItemType?.__raw__;
    if (itemType) {
      return items.every(i => i.snoItemType?.__raw__ === itemType);
    }
  }

  return false;
}

function composeName(deps: D4Dependencies) {
  return (...items: (D4Ref & D4Type)[]): string => {
    return items
      .map(i => {
        const itemStrings = resolveStringsList(i, deps.strings);

        const storeProduct = resolveStoreProduct(i, deps.storeProducts);
        const storeStrings = resolveStringsList(storeProduct, deps.strings);

        return getTextFromStl(itemStrings, "Name", getTextFromStl(storeStrings, "Name"));
      })
      .filter((v, i, self) => {
        return i == self.indexOf(v);
      })
      .join(", ");
  }
}

function achievementToCollectionItems(deps: D4Dependencies): (achievement: D4Achievement) => D4DadCollectionItem[] {
  return (achievement: D4Achievement): D4DadCollectionItem[] => {

    const toCollectionItem = (...items: (D4Type & D4Ref)[]): D4DadCollectionItem => ({
      id: -1,
      name: composeName(deps)(...items),
      claim: "TODO",
      premium: achievement.tBattlePassTrack === 1 ? true : undefined,
      items: items.map(i => i.__snoID__),
    });

    const il = achievement
      .arRewardList
      .map(rewardListToItemList(deps))
      .reduce(mergeItemLists, createItemList());

    const collectionItems = [];

    if (il.titles) {
      collectionItems.push(toCollectionItem(...il.titles));
    }

    if (il.items.length) {
      if (shouldItemsBeAggregated(il.items)) {
        collectionItems.push(toCollectionItem(...il.items));
      } else {
        collectionItems.push(...il.items.map(i => toCollectionItem(i)));
      }
    }

    if (il.emblems.length) {
      collectionItems.push(...il.emblems.map(i => toCollectionItem(i)));
    }

    if (il.bundles) {
      const bundleItems = il
        .bundles
        .map(unpackStoreProduct(deps))
        .reduce(mergeItemLists, createItemList());

      if (bundleItems.items.length) {
        if (shouldItemsBeAggregated(bundleItems.items)) {
          collectionItems.push(toCollectionItem(...bundleItems.items));
        } else {
          collectionItems.push(...bundleItems.items.map(i => toCollectionItem(i)));
        }
      }

      if (bundleItems.emotes.length) {
        collectionItems.push(toCollectionItem(...bundleItems.emotes));
      }

      if (bundleItems.markings.length) {
        collectionItems.push(toCollectionItem(...bundleItems.markings));
      }

      if (bundleItems.emblems) {
        collectionItems.push(...bundleItems.emblems.map(i => toCollectionItem(i)));
      }

      if (bundleItems.portals) {
        collectionItems.push(...bundleItems.portals.map(i => toCollectionItem(i)));
      }

      if (bundleItems.headstones) {
        collectionItems.push(...bundleItems.headstones.map(i => toCollectionItem(i)));
      }
    }

    return collectionItems;
  };
}

export function challengeToCollection(deps: D4Dependencies): (definition: D4ChallengeDefinition, category: D4ChallengeCategory) => D4DadCollection {
  return (definition: D4ChallengeDefinition, category: D4ChallengeCategory): D4DadCollection => {
    const challengeStringsList = resolveStringsList(definition, deps.strings);
    const name = getTextFromStl(challengeStringsList, "Challenge_Category_" + category.dwID);
    const achievements = category
      .arAchievementSnos
      .map(a => resolveSno(a, deps.achievements))
      .filter((a): a is D4Achievement => a !== undefined);

    return {
      id: category.dwID,
      name: name,
      subcollections: category.arCategories.map(c => challengeToCollection(deps)(definition, c)),
      collectionItems: achievements.map(a => achievementToCollectionItems(deps)(a)).flat().filter(ci => ci.items.length),
    };
  }
}
