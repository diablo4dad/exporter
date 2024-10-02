import { Category } from '../../index.js';

const SEASON03 = {
  name: 'Season of the Construct',
  description: 'Season 3 starting January 23rd, 2024',
  category: Category.SEASONS,
  season: 3,
  outOfRotation: true,
  children: [
    {
      name: 'Battle Pass #3',
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season3_Rewards.cha.json',
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s03.prd.json'],
    },
    {
      name: 'Season Journey #3',
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season3.cha.json',
      achievements: [
        'json\\base\\meta\\Achievement\\Feat_S03_AllJourneyTasks.ach.json',
        'json\\base\\meta\\Achievement\\Feat_S03_QuestComplete.ach.json',
      ],
    },
  ],
};

export default SEASON03;
