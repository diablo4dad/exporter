import { buildCollection, Category, CollectionDescriptor } from '../../index.js';
import { D4Dependencies } from '../../../d4.js';

export function buildSeasonsCollection(deps: D4Dependencies) {
  return MANIFEST.map(buildCollection(deps));
}

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
      patches: [{
        items: [1989995],
        claim: 'Season Journey',
        claimDescription: 'Obtained from the final Season Journey cache.',
      }],
    },
  ],
};

const SEASON04: CollectionDescriptor = {
  name: 'Season of Loot Reborn',
  description: 'Season 4 starting May 14th, 2024',
  category: Category.SEASONS,
  season: 4,
  outOfRotation: true,
  children: [
    {
      name: 'Battle Pass #4',
      category: Category.BATTLE_PASS,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season4_Rewards.cha.json',
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s04.prd.json'],
    },
    {
      name: 'Season Journey #4',
      category: Category.SEASON_JOURNEY,
      challengeFileFlatten: true,
      challengeFile: 'json\\base\\meta\\Challenge\\Season4.cha.json',
      achievements: ['json\\base\\meta\\Achievement\\Feat_S04_AllJourneyTasks.ach.json'],
      items: [['json\\base\\meta\\Item\\mnt_uniq28_trophy.itm.json']],
      patches: [{
        items: [1891999],
        claim: 'Boss Drop',
        claimDescription: 'Dropped by the Blood Maiden in the final Season Journey quest.',
      }],
    },
    {
      name: 'Reputation Board #4',
      category: Category.REPUTATION,
      reputationFile: 'json\\base\\meta\\Reputation\\IronWolves_Helltide_Reputation.rep.json',
      items: [['json\\base\\meta\\Item\\mnt_stor232_trophy.itm.json']],
      patches: [{
        items: [1867325],
        claim: 'Reputation Board',
        claimDescription: 'Complete the Iron Wolf\'s Reputation Board.',
      }],
    },
  ],
};

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
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s03.prd.json',
      ],
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
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Battlepass_Accelerated_s01.prd.json',
      ],
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
    },
  ],
};

const MANIFEST: CollectionDescriptor[] = [
  SEASON05,
  SEASON04,
  SEASON03,
  SEASON02,
  SEASON01,
];
