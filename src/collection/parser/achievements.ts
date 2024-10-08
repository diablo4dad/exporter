import { resolveSno, resolveStringsList } from '../../d4data/resolver.js';
import { D4Achievement, D4Ref, D4RewardDefinition, D4Type } from '../../d4data/struct.js';
import { getTextFromStl } from '../../d4reader/strings.js';
import { D4Dependencies } from '../../d4reader/struct.js';
import {
  aggregateItemList,
  composeName,
  createItemList,
  filterItemList,
  mergeItemLists,
  pushToItemList,
} from '../index.js';
import {
  D4DadAchievement,
  D4DadAchievementRewards,
  D4DadCollectionItem,
  D4DadTranslation,
  ItemList,
} from '../struct.js';

export function achievementToCollectionItems(
  deps: D4Dependencies,
): (achievement: D4Achievement) => D4DadCollectionItem[] {
  return (achievement: D4Achievement): D4DadCollectionItem[] => {
    const achievementStrings = resolveStringsList(achievement, deps.strings);
    const description = getTextFromStl(
      achievementStrings,
      'DescShort',
      getTextFromStl(achievementStrings, 'Desc', getTextFromStl(achievementStrings, 'Name')),
    );

    const toCollectionItem = (...items: (D4Type & D4Ref)[]): D4DadCollectionItem => ({
      id: -1,
      name: composeName(deps)(...items),
      claim: 'Challenge',
      claimDescription: description,
      premium: achievement.tBattlePassTrack === 1 ? true : undefined,
      items: items.map((i) => i.__snoID__),
    });

    const il = achievement.arRewardList.map(unpackRewardList(deps)).reduce(mergeItemLists, createItemList());

    return aggregateItemList(deps)(il).map((i) => toCollectionItem(...i));
  };
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
  };
}

export function achievementToDad(
  deps: D4Dependencies,
): (achievement: D4Achievement) => [D4DadAchievement, D4DadTranslation] {
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
    }, {});

    const id = achievement.__snoID__;
    const filename = achievement.__fileName__;
    const achievementStrings = resolveStringsList(achievement, deps.strings);
    const name = getTextFromStl(achievementStrings, 'Name');
    const description = getTextFromStl(achievementStrings, 'DescShort', getTextFromStl(achievementStrings, 'Desc'));

    return [
      {
        id,
        filename,
        rewards,
      },
      {
        name,
        description,
      },
    ];
  };
}
