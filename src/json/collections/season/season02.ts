import { Category, CollectionDescriptor } from '../../index.js';

const SEASON02: CollectionDescriptor = {
  name: 'Season of Blood',
  description: 'Season 2 starting October 17th, 2023',
  category: Category.SEASONS,
  season: 2,
  outOfRotation: true,
  children: [
    {
      name: 'Battle Pass #2',
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season2_Rewards.cha.json',
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s02.prd.json',
      ],
    },
    {
      name: 'Season Journey #2',
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season2.cha.json',
      achievements: [
        'json\\base\\meta\\Achievement\\Feat_S02_AllJourneyTasks.ach.json',
        'json\\base\\meta\\Achievement\\Feat_S02_QuestComplete.ach.json',
        'json\\base\\meta\\Achievement\\Hidden_S02_QuestComplete_MountTrophy.ach.json',
      ],
    },
    {
      name: 'Reputation Board #2',
      category: Category.REPUTATION,
      reputationFile: 'json\\base\\meta\\Reputation\\SME_Vampzone_Reputation.rep.json',
      achievements: [
        'json\\base\\meta\\Achievement\\S02_Hidden_Reputation_Level4Titles.ach.json',
        'json\\base\\meta\\Achievement\\S02_Hidden_Reputation_Level18Titles.ach.json',
      ],
    },
  ],
};

export default SEASON02;
