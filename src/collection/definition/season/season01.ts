import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const SEASON01: CollectionDescriptor = {
  name: 'Season of Malignant',
  description: 'Season 1 starting July 20th, 2023',
  category: Category.SEASONS,
  season: 1,
  outOfRotation: true,
  children: [
    {
      name: 'Battle Pass #1',
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season1_Rewards.cha.json',
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s01.prd.json'],
    },
    {
      name: 'Season Journey #1',
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season1.cha.json',
      achievements: [
        'json\\base\\meta\\Achievement\\Feat_S01_QuestComplete.ach.json',
        'json\\base\\meta\\Achievement\\Feat_S01_AllJourneyTasks.ach.json',
        'json\\base\\meta\\Achievement\\Hidden_S01_QuestComplete_MountTrophy.ach.json',
      ],
      patches: [
        {
          items: [921365],
          claimDescription: 'Complete the Season 1 Season Journey.',
        },
      ],
    },
  ],
};

export default SEASON01;
