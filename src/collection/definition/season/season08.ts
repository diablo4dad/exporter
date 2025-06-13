import { Category } from '../../constants.js';
import { CollectionDescriptor, D4DadCollection, D4DadCollectionItem } from '../../struct.js';

const SEASON08: CollectionDescriptor = {
  name: "Belial's Return",
  description: 'Season 8 starting April 29th, 2025',
  category: Category.SEASONS,
  season: 8,
  children: [
    {
      name: 'Battle Pass #8',
      category: Category.BATTLE_PASS,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s08.prd.json'],
    },
    {
      name: 'Season Journey #8',
      category: Category.SEASON_JOURNEY,
      challengeFile: 'json\\base\\meta\\Challenge\\Season8.cha.json',
      challengeFileFlatten: true,
    },
  ],
  postHook: groupItemsWithSameName,
};

function groupItemsWithSameName(c: D4DadCollection): D4DadCollection {
  return {
    ...c,
    subcollections: c.subcollections.map(groupItemsWithSameName),
    collectionItems: c.collectionItems.reduce((a, c) => {
      const existing = a.find((d) => d.name === c.name);
      if (existing) {
        existing.items.push(...c.items);
      } else {
        a.push(c);
      }
      return a;
    }, [] as D4DadCollectionItem[]),
  };
}

export default SEASON08;
