import { Category } from '../../constants.js';
import { groupItemsWithSameName } from '../../helper.js';
import { CollectionDescriptor } from '../../struct.js';

const SEASON12: CollectionDescriptor = {
  name: 'Season of Slaughter',
  description: 'Season 12 starting March 11th, 2026',
  category: Category.SEASONS,
  season: 12,
  children: [
    {
      name: 'Battle Pass Reliquary #12: Season of Slaughter',
      description: 'Season of Slaughter',
      category: Category.BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_012_free.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #12: Weapons',
      description: 'Season of Slaughter',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_012_weapons.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #12: Beasts',
      description: 'Season of Slaughter',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_012_beasts.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #12: Armor',
      description: 'Season of Slaughter',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_012_armor.prd.json'],
    },
    {
      name: 'Deluxe Battle Pass Reliquary #12',
      description: 'Season of Slaughter',
      category: Category.DELUXE_BATTLE_PASS_RELIQUARY,
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_trophy_glo014_stor.prd.json',
        'json\\base\\meta\\StoreProduct\\Bundle_cmp_stor100_bearLarge.prd.json',
      ],
    },
    {
      name: 'Season Journey #12',
      category: Category.SEASON_JOURNEY,
      challengeFile: 'json\\base\\meta\\Challenge\\Season12.cha.json',
      challengeFileFlatten: true,
      items: [['json\\base\\meta\\Item\\mnt_uniq42_trophy.itm.json']],
      patches: [
        {
          items: [2593309, 2593316],
          claimDescription: 'Complete the Capstone Dungeon "Vault of the Crucible" (Monster Lv. 30 - Hard).',
        },
        {
          items: [2516283],
          claimDescription: 'Complete the Capstone Dungeon "Hellish Descent" (Monster Lv. 50 - Penitent).',
        },
        {
          items: [2579148],
          claimDescription:
            'Complete the Capstone Dungeon "Den of the Apostate" (Monster Lv. Pit Tier 30 - Torment II).',
        },
        {
          items: [2571410],
          claimDescription: "Defeat The Butcher and open The Butcher's Hoard in Torment III.",
        },
        {
          items: [2516285],
          claimDescription: 'Defeat a Bloodied Lair Boss in Torment III or higher.',
        },
        {
          items: [2575769],
          claimDescription: 'Random drop by defeating The Butcher in The Broiler.',
        },
      ],
    },
  ],
  postHook: groupItemsWithSameName,
};

export default SEASON12;
