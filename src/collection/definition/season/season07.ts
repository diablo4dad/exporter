import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const SEASON07: CollectionDescriptor = {
  name: 'Season of Witchcraft',
  description: 'Season 7 starting January 21st, 2025',
  category: Category.SEASONS,
  season: 7,
  children: [
    {
      name: 'Battle Pass #7',
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season7_Rewards.cha.json',
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s07.prd.json'],
    },
    {
      name: 'Season Journey #7',
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season7.cha.json',
      achievements: ['json\\base\\meta\\Achievement\\SJ_S07_CompleteAllChallenges_Hidden.ach.json'],
      patches: [
        {
          items: [1981526],
          claimDescription: 'Complete the Season 7 Journey.',
        },
      ],
    },
  ],
};

export default SEASON07;
