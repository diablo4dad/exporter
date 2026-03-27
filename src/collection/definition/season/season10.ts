import { Category } from '../../constants.js';
import { groupItemsWithSameName } from '../../helper.js';
import { CollectionDescriptor } from '../../struct.js';

const SEASON10: CollectionDescriptor = {
  name: 'Season of Infernal Chaos',
  description: 'Season 10 starting September 10th, 2025',
  category: Category.SEASONS,
  season: 8,
  children: [
    {
      name: 'Battle Pass Reliquary #10: Infernal Chaos',
      description: 'Infernal Chaos',
      category: Category.BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_010_free.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #10: Weapons',
      description: 'Infernal Chaos',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_010_weapons.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #10: Beasts',
      description: 'Infernal Chaos',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_010_beasts.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #10: Armor',
      description: 'Infernal Chaos',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_010_armor.prd.json'],
    },
    {
      name: 'Deluxe Battle Pass Reliquary #10',
      description: 'Infernal Chaos',
      category: Category.DELUXE_BATTLE_PASS_RELIQUARY,
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_BattlePass_Deluxe_S10_Wings.prd.json',
        'json\\base\\meta\\StoreProduct\\Bundle_cmp_stor103_dogLarge.prd.json',
      ],
    },
    {
      name: 'Season Journey #10',
      category: Category.SEASON_JOURNEY,
      challengeFile: 'json\\base\\meta\\Challenge\\Season10.cha.json',
      challengeFileFlatten: true,
    },
  ],
  postHook: groupItemsWithSameName,
};

export default SEASON10;
