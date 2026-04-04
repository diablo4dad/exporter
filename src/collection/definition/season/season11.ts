import { Category } from '../../constants.js';
import { groupItemsWithSameName } from '../../helper.js';
import { CollectionDescriptor } from '../../struct.js';

const SEASON11: CollectionDescriptor = {
  name: 'Season of Divine Intervention',
  description: 'Season 11 starting December 11th, 2025',
  category: Category.SEASONS,
  season: 11,
  outOfRotation: true,
  children: [
    {
      name: 'Battle Pass Reliquary #11: Season of Divine Intervention',
      description: 'Season of Divine Intervention',
      category: Category.BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_011_free.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #11: Weapons',
      description: 'Season of Divine Intervention',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_011_weapons.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #11: Beasts',
      description: 'Season of Divine Intervention',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_011_beasts.prd.json'],
    },
    {
      name: 'Premium Battle Pass Reliquary #11: Armor',
      description: 'Season of Divine Intervention',
      category: Category.PREMIUM_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Catalog_BattlePass_011_armor.prd.json'],
    },
    {
      name: 'Deluxe Battle Pass Reliquary #11',
      description: 'Season of Divine Intervention',
      category: Category.DELUXE_BATTLE_PASS_RELIQUARY,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_BattlePass_011_deluxe.prd.json'],
    },
    {
      name: 'Season Journey #11',
      category: Category.SEASON_JOURNEY,
      challengeFile: 'json\\base\\meta\\Challenge\\Season11.cha.json',
      challengeFileFlatten: true,
      items: [['json\\base\\meta\\Item\\mnt_uniq97_trophy.itm.json']],
      patches: [
        {
          items: [2516421, 2516423],
          claimDescription: 'Complete the Capstone Dungeon "Vault of the Crucible" (Monster Lv. 30 - Hard).',
        },
        {
          items: [2254542],
          claimDescription: 'Complete the Capstone Dungeon "Hellish Descent" (Monster Lv. 50 - Penitent).',
        },
        {
          items: [2468469],
          claimDescription:
            'Complete the Capstone Dungeon "Den of the Apostate" (Monster Lv. Pit Tier 30 - Torment II).',
        },
        {
          items: [2493794],
          claimDescription: 'Complete the Capstone Dungeon "Breach of Sins" (Monster Lv. Pit Tier 45 - Torment III).',
        },
        {
          items: [2254544],
          claimDescription: 'Complete the Capstone Dungeon "Breach of Sins" (Monster Lv. Pit Tier 45 - Torment III).',
        },
        {
          items: [2420630],
          claimDescription:
            'Obtained by defeating Lesser Evils bosses in secret boss lair by offering each 4 purified essences to hidden altars.',
        },
      ],
    },
  ],
  postHook: groupItemsWithSameName,
};

export default SEASON11;
