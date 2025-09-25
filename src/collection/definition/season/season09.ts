import { Category } from '../../constants.js';
import { groupItemsWithSameName } from '../../helper.js';
import { CollectionDescriptor } from '../../struct.js';

const SEASON09: CollectionDescriptor = {
  name: 'Sins of the Horadrim',
  description: 'Season 9 starting July 1st, 2025',
  category: Category.SEASONS,
  season: 8,
  children: [
    {
      name: 'Battle Pass Reliquary #9: Sins of the Horadrim',
      description: 'Sins of the Horadrim',
      category: Category.BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_009_free.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #9: Weapons',
      description: 'Sins of the Horadrim',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_009_weapons.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #9: Beasts',
      description: 'Sins of the Horadrim',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_009_beasts.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #9: Armor',
      description: 'Sins of the Horadrim',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_009_armor.prd.json'],
    },
    {
      name: 'Deluxe Battle Pass Reliquary #9',
      description: 'Sins of the Horadrim',
      category: Category.DELUXE_BATTLE_PASS_RELIQUARY,
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_BattlePass_009_deluxe.prd.json',
        'json\\base\\meta\\StoreProduct\\Bundle_Battlepass_009_pet2.prd.json',
      ],
    },
    {
      name: 'Season Journey #9',
      category: Category.SEASON_JOURNEY,
      challengeFile: 'json\\base\\meta\\Challenge\\Season9.cha.json',
      challengeFileFlatten: true,
    },
  ],
  postHook: groupItemsWithSameName,
};

export default SEASON09;
