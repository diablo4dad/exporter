import {
  D4Achievement,
  D4ChallengeCategory,
  D4ChallengeDefinition,
  D4Dependencies,
  D4Ref,
  D4RewardDefinition,
  D4Type,
  getTextFromStl,
  resolveSno,
  resolveStringsList,
  stu
} from "../../d4.js";
import {
  aggregateItemList,
  composeName,
  createItemList,
  D4DadChallenge,
  D4DadChallengeCategory,
  D4DadCollection,
  D4DadCollectionItem,
  D4DadTranslation,
  filterItemList,
  ItemList,
  mergeItemLists,
  pushToItemList
} from "../index.js";

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

function unpackRewardList(deps: D4Dependencies): (rewards: D4RewardDefinition) => ItemList {
  return (a: D4RewardDefinition): ItemList => {
    let itemList = createItemList();

    itemList = pushToItemList(itemList, resolveSno(a.snoItem, deps.items));
    itemList = pushToItemList(itemList, resolveSno(a.snoPlayerTitle, deps.playerTitles));
    itemList = pushToItemList(itemList, resolveSno(a.snoEmblem, deps.emblems));
    itemList = pushToItemList(itemList, resolveSno(a.snoStoreProduct, deps.storeProducts));

    itemList = filterItemList(itemList);

    return itemList;
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
      .map(unpackRewardList(deps))
      .reduce(mergeItemLists, createItemList());

    return aggregateItemList(deps)(il).map(i => toCollectionItem(...i));
  };
}

export function challengeToCollection(deps: D4Dependencies) {
  return (definition: D4ChallengeDefinition) => {
    return (category: D4ChallengeCategory): D4DadCollection => {
      const challengeStringsList = resolveStringsList(definition, deps.strings);
      const name = getTextFromStl(challengeStringsList, "Challenge_Category_" + category.dwID);
      const achievements = category
        .arAchievementSnos
        .map(a => resolveSno(a, deps.achievements))
        .filter((a): a is D4Achievement => a !== undefined);

      return {
        id: category.dwID,
        name: name,
        subcollections: category.arCategories.map(challengeToCollection(deps)(definition)),
        collectionItems: achievements
          .map(achievementToCollectionItems(deps))
          .flat()
          .filter(ci => ci.items.length),
      };
    }
  }
}
