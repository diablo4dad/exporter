import {CollectionItemReq, CollectionReq} from "../common.js";
import {
  D4Achievement,
  D4ChallengeCategory,
  D4ChallengeDefinition,
  D4Dependencies,
  D4RewardDefinition,
  getTextFromStl,
  resolveSno,
  resolveStringsList
} from "../../d4.js";
import {extractItemFromProduct} from "./bundles.js";

export function challengeFactory(deps: D4Dependencies): (definition: D4ChallengeDefinition, category: D4ChallengeCategory, delta: number) => CollectionReq {
  return (definition: D4ChallengeDefinition, category: D4ChallengeCategory, delta = 0): CollectionReq => {
    const challengeStringsList = resolveStringsList(definition, deps.strings);

    const challengeId = category.dwID;
    const categoryName = "Challenge";
    const name = getTextFromStl(challengeStringsList, "Challenge_Category_" + category.dwID);
    const description = "";
    const collectionItems: number[] = [];
    const order = 6000 + delta;
    const platinum = 0;

    return {
      name,
      description,
      category: categoryName,
      collectionItems,
      itemId: challengeId,
      order,
      platinum,
    }
  }
}

type RewardList = {
  titles: number[],
  items: number[],
  emblems: number[],
  bundles: number[],
}

export function challengeRewardFactory(deps: D4Dependencies): (category: D4ChallengeCategory, achievement: D4Achievement) => CollectionItemReq[] {
  return (category: D4ChallengeCategory, achievement: D4Achievement): CollectionItemReq[] => {
    const rewardList = achievement.arRewardList.reduce((c: RewardList, a: D4RewardDefinition) => {
      if (a.snoPlayerTitle) {
        const title = resolveSno(a.snoPlayerTitle, deps.playerTitles);
        if (title) {
          c.titles.push(title.__snoID__);
        }
      }

      if (a.snoItem) {
        const item = resolveSno(a.snoItem, deps.items);
        if (item) {
          c.items.push(item.__snoID__);
        }
      }

      if (a.snoEmblem) {
        const emblem = resolveSno(a.snoEmblem, deps.emblems);
        if (emblem) {
          c.emblems.push(emblem.__snoID__);
        }
      }

      if (a.snoStoreProduct) {
        const product = resolveSno(a.snoStoreProduct, deps.storeProducts);
        if (product) {
          const item = extractItemFromProduct(deps)(product);
          if (item) {
            c.bundles.push(item.__snoID__);
          }

          product.arBundledProducts.forEach(bp => {
            const innerProduct = resolveSno(bp, deps.storeProducts);
            if (innerProduct) {
              const innerItem = extractItemFromProduct(deps)(innerProduct);
              if (innerItem) {
                c.bundles.push(innerItem.__snoID__);
              }
            }
          });
        }
      }

      return c;
    }, { titles: [], items: [], emblems: [], bundles: [] });

    const achievementStrings = resolveStringsList(achievement, deps.strings);
    const name = getTextFromStl(achievementStrings, "Name");
    const desc = getTextFromStl(achievementStrings, "DescShort", getTextFromStl(achievementStrings, "Desc"));
    const claim = "Challenge Reward";
    const claimDescription = `${name}: ${desc}`;

    const collectionItems: CollectionItemReq[] = [];
    const baseReq: CollectionItemReq = {
      items: [],
      collection: category.dwID,
      claim,
      claimDescription,
    };

    if (rewardList.titles) {
      collectionItems.push({ ...baseReq, items: rewardList.titles });
    }

    if (rewardList.items) {
      collectionItems.push(...rewardList.items.map(i => ({ ...baseReq, items: [i] })));
    }

    if (rewardList.emblems) {
      collectionItems.push(...rewardList.emblems.map(i => ({ ...baseReq, items: [i] })));
    }

    if (rewardList.bundles) {
      collectionItems.push(...rewardList.bundles.map(i => ({ ...baseReq, items: [i] })));
    }

    return collectionItems;
  }
}
