import { Category, CollectionDescriptor } from '../../index.js';

const QUEST: CollectionDescriptor = {
  name: 'Quest',
  description: 'Transmogs rewarded for completing quests',
  category: Category.ACTIVITY,
  claim: 'Quest Reward',
  items: [
    ['json\\base\\meta\\Item\\MountReins_OldNellHorse.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_BloodyLiquidMount.itm.json'],
    ['json\\base\\meta\\Item\\1HShield_QST_Hawe_ZakFort_Carthas_01.itm.json'],
    ['json\\base\\meta\\Item\\1HMace_Rare_Barb_Crafted_37.itm.json'],
    ['json\\base\\meta\\Item\\1HDagger_Rare_Rogue_Crafted_27.itm.json'],
    ['json\\base\\meta\\Item\\cmp_base00_dog.itm.json'],
  ],
  patches: [
    {
      items: [623168],
      claimDescription: 'Complete the mount introduction quest "Donan\'s Favor".',
    },
    {
      items: [1257432],
      claimDescription: 'Complete the "Echo of Hatred" quest by killing Lilith.',
    },
    {
      items: [1472930],
      claimDescription: 'Complete the "Remembering the Fallen" side quest in Zarbinzet.',
    },
    {
      items: [1867815],
      claimDescription: 'Complete the "Faithful Companion" quest in Kyovashad.',
    },
    {
      items: [459998],
      claimDescription: 'Complete the "A Pound of Flesh" side quest in Dry Steppes.',
    },
    {
      items: [459943],
      claimDescription: 'Complete the Act 5 “Cold Blood” quest.',
    },
  ],
};

const GAUNTLET: CollectionDescriptor = {
  name: 'Gauntlet',
  description: 'Transmogs earned by ranking in the gauntlet leaderboards',
  category: Category.ACTIVITY,
  claim: "Gauntlet",
  claimDescription: "Appear in the first 100 places in the solo or party leaderboard.",
  items: [
    ['json\\base\\meta\\Item\\mnt_chal003_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_chal004_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_chal005_trophy.itm.json'],
  ],
  patches: [
    {
      items: [1904653],
      season: 4,
      outOfRotation: true,
    },
    {
      items: [1975292],
      season: 5,
    },
  ],
};

const VENDOR: CollectionDescriptor = {
  name: 'Vendor',
  description: 'Transmogs purchased from vendors',
  category: Category.ACTIVITY,
  claim: 'Vendor',
  claimDescription: 'Purchased from the Stable Master.',
  items: [
    ['json\\base\\meta\\Item\\MountReins_WhiteHorse.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_MottledHorse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor01_horse.itm.json'],
  ],
};

const TREE_OF_WHISPERS: CollectionDescriptor = {
  name: 'Tree of Whispers',
  description: 'Transmogs looted from Tree of Whispers caches',
  category: Category.ACTIVITY,
  claim: 'Quest Reward',
  claimDescription: 'Drops from Tree of Whispers Caches.',
  items: [
    ['json\\base\\meta\\Item\\mnt_amor64_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor62_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq62_trophy.itm.json'],
  ],
};

const ACTIVITY: CollectionDescriptor = {
  name: 'Activity',
  description: 'Transmogs acquired through various activities',
  category: Category.GENERAL,
  children: [
    TREE_OF_WHISPERS,
    GAUNTLET,
    QUEST,
    VENDOR,
  ],
};

export default ACTIVITY;
