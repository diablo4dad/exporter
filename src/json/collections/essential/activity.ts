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
  name: 'Activities',
  description: 'Transmogs acquired through various activities',
  category: Category.GENERAL,
  children: [
    QUEST,
    VENDOR,
    TREE_OF_WHISPERS,
  ],
};

export default ACTIVITY;
