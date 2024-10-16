import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const SEASON06: CollectionDescriptor = {
  name: 'Season of Hatred Rising',
  description: 'Season 6 starting October 8th, 2024',
  category: Category.SEASONS,
  season: 6,
  children: [
    {
      name: 'Battle Pass #6',
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season6_Rewards.cha.json',
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s06.prd.json'],
    },
    {
      name: 'Season Journey #6',
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season6.cha.json',
      achievements: ['json\\base\\meta\\Achievement\\Feat_S06_AllJourneyTasks.ach.json'],
      items: [['json\\base\\meta\\Item\\2HMace_Legendary_Generic_003.itm.json']],
      patches: [
        {
          items: [592302],
          claimDescription:
            'Obtained during Season 6 from a Season Journey Chapter 2 cache, only if opened with a Necromancer.',
        },
      ],
    },
  ],
};

export default SEASON06;
