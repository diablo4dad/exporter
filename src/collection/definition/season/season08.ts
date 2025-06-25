import { Category } from '../../constants.js';
import { CollectionDescriptor, D4DadCollection, D4DadCollectionItem } from '../../struct.js';

const SEASON08: CollectionDescriptor = {
  name: "Belial's Return",
  description: 'Season 8 starting April 29th, 2025',
  category: Category.SEASONS,
  season: 8,
  children: [
    {
      name: "Battle Pass Reliquary #8: Belial's Return",
      description: "Belial's Return",
      category: Category.BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_008_free.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #8: Weapons',
      description: "Belial's Return",
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_008_weapons.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #8: Beasts',
      description: "Belial's Return",
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_008_beasts.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #8: Armor',
      description: "Belial's Return",
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_008_armor.prd.json'],
    },
    {
      name: 'Deluxe Battle Pass Reliquary #8',
      description: "Belial's Return",
      category: Category.DELUXE_BATTLE_PASS_RELIQUARY,
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Deluxe_S08_Wings.prd.json',
        'json\\base\\meta\\StoreProduct\\Bundle_Battlepass_008_pet2.prd.json',
      ],
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
