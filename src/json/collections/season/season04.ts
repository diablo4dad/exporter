import { Category, CollectionDescriptor } from '../../index.js';

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
      items: [
        ['json\\base\\meta\\Item\\mnt_uniq28_trophy.itm.json'],
        ['json\\base\\meta\\Item\\1HFocus_Legendary_Generic_006.itm.json'],
      ],
      patches: [
        {
          items: [1891999],
          claim: 'Boss Drop',
          claimDescription: 'Dropped by the Blood Maiden during Season 4 by completing the final Season Journey quest.',
        },
        {
          items: [1266836],
          claimDescription:
            'Obtained during Season 4 from a Season Journey Chapter 3 cache, only if opened with a Necromancer.',
        },
      ],
    },
    {
      name: 'Reputation Board #4',
      category: Category.REPUTATION,
      reputationFile: 'json\\base\\meta\\Reputation\\IronWolves_Helltide_Reputation.rep.json',
      items: [['json\\base\\meta\\Item\\mnt_stor232_trophy.itm.json']],
      patches: [
        {
          items: [1867325],
          claim: 'Reputation Board',
          claimDescription: "Complete the Iron Wolf's Reputation Board.",
        },
      ],
    },
  ],
};

export default SEASON04;
