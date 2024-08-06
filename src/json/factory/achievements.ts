import {
  D4Achievement,
  D4Dependencies,
  D4RewardDefinition,
  getTextFromStl,
  resolveSno,
  resolveStringsList
} from "../../d4.js";
import {D4DadAchievement, D4DadAchievementRewards, D4DadTranslation} from "../index.js";

export function achievementToDad(deps: D4Dependencies): (achievement: D4Achievement) => [D4DadAchievement, D4DadTranslation] {
  return (achievement: D4Achievement): [D4DadAchievement, D4DadTranslation] => {
    const rewards = achievement.arRewardList.reduce((c: D4DadAchievementRewards, a: D4RewardDefinition) => {
      if (a.snoPlayerTitle) {
        const title = resolveSno(a.snoPlayerTitle, deps.playerTitles);
        if (title) {
          if (c.items === undefined) {
            c.items = [];
          }

          c.items.push(title.__snoID__);
        }
      }

      if (a.snoItem) {
        const item = resolveSno(a.snoItem, deps.items);
        if (item) {
          if (c.items === undefined) {
            c.items = [];
          }

          c.items.push(item.__snoID__);
        }
      }

      if (a.snoEmblem) {
        const emblem = resolveSno(a.snoEmblem, deps.emblems);
        if (emblem) {
          if (c.items === undefined) {
            c.items = [];
          }

          c.items.push(emblem.__snoID__);
        }
      }

      if (a.snoStoreProduct) {
        const product = resolveSno(a.snoStoreProduct, deps.storeProducts);
        if (product) {
          if (c.products === undefined) {
            c.products = [];
          }

          c.products.push(product.__snoID__);
        }
      }

      return c;
    }, { });

    const id = achievement.__snoID__;
    const filename = achievement.__fileName__;
    const achievementStrings = resolveStringsList(achievement, deps.strings);
    const name = getTextFromStl(achievementStrings, "Name");
    const description = getTextFromStl(achievementStrings, "DescShort", getTextFromStl(achievementStrings, "Desc"));

    return [{
      id,
      filename,
      rewards,
    }, {
      name,
      description,
    }];
  }
}
