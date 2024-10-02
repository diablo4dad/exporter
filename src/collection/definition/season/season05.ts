import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

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
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s05.prd.json'],
    },
    {
      name: 'Season Journey #5',
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season5.cha.json',
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
          items: [592302],
          claimDescription:
            'Obtained during Season 5 from a Season Journey Chapter 2 cache, only if opened with a Necromancer.',
        },
        {
          items: [459858],
          claimDescription: 'Obtained during Season 5 by salvaging "Istel\'s Grimoire" from the seasonal quest line.',
        },
      ],
    },
    {
      name: 'Reputation Board #5',
      category: Category.REPUTATION,
      reputationFile: 'json\\base\\meta\\Reputation\\S05_Cultist_Helltide_Reputation.rep.json',
      items: [['json\\base\\meta\\Item\\mnt_uniq29_trophy.itm.json']],
      patches: [
        {
          items: [1989995],
          claimDescription:
            'Obtained during Season 5 from the "Greater Triune Arms Cache", the final reward on the Mothers Gift Board.',
        },
      ],
    },
  ],
};

export default SEASON05;
