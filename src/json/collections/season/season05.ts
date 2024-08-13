import { Category, CollectionDescriptor } from '../../index.js';

const SEASON05: CollectionDescriptor = {
  name: 'Season of the Infernal Hordes',
  description: 'Season 5 starting August 6th, 2024',
  category: Category.SEASONS,
  season: 5,
  children: [
    {
      name: 'Battle Pass #5',
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season5_Rewards.cha.json',
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s05.prd.json',
      ],
    },
    {
      name: 'Season Journey #5',
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season5.cha.json',
      storeProducts: ['json\\base\\meta\\StoreProduct\\mnt_uniq29_trophy.prd.json'],
      achievements: [
        'json\\base\\meta\\Achievement\\Feat_S05_AllJourneyTasks.ach.json',
        'json\\base\\meta\\Achievement\\Feat_S05_QuestComplete.ach.json',
      ],
      items: [
        ['json\\base\\meta\\Item\\2HMace_Legendary_Generic_003.itm.json'],
        ['json\\base\\meta\\Item\\1HFocus_Rare_Sorc_Crafted_25.itm.json'],
      ],
      patches: [
        {
          items: [1989995],
          claimDescription: 'Obtained during Season 5 from the final Season Journey cache.',
        },
        {
          items: [592302],
          claimDescription: 'Obtained during Season 5 from a Season Journey Chapter 2 cache, only if opened with a Necromancer.',
        },
        {
          items: [459858],
          claimDescription: 'Obtained during Season 5 by salvaging "Istel\'s Grimoire" from the seasonal quest line.',
        },
      ],
    },
  ],
};

export default SEASON05;
