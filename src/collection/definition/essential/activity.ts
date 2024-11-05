import { Category, Zone } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

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
    ['json\\base\\meta\\Item\\cmp_base000_dogLarge.itm.json'],
    // expansion
    ['json\\base\\meta\\Item\\X1_QST_1HFocus_GoingNative_Legendary_17.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_2HAxe_ShroudOfWrath_Legendary_Generic_11.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_2HGlaive_Legendary_Spiritborn_010.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_2HScythe_FiveHills_Legendary_13.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_2HStaff_Treeman_Legendary_Druid_13.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_2HSword_Legendary_Generic_Hollow_Boss.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Sword_Legendary_Generic_Akarats_Sword.itm.json'],
    ['json\\base\\meta\\Item\\X1_1HDagger_QST_16_Reward.itm.json'],
    ['json\\base\\meta\\Item\\X1_2HBow_QST_Teganze_Reward_15.itm.json'],
    ['json\\base\\meta\\Item\\QST_Naha_EverythingOld_SwordReward.itm.json'],
    ['json\\base\\meta\\Item\\QST_Naha_ScalesOfHistory_DaggerReward.itm.json'],
    ['json\\base\\meta\\Item\\X1_1HSword_Cosmetic_Urivar.itm.json'],
    ['json\\base\\meta\\Item\\X1_Helm_Cosmetic_Urivar.itm.json'],
    // expansion armor
    ['json\\base\\meta\\Item\\X1_QST_Helm_Legendary_Generic_HatredSet.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Chest_Legendary_Generic_HatredSet.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Gloves_Legendary_Generic_HatredSet.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Pants_Legendary_Generic_HatredSet.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Boots_Legendary_Generic_HatredSet.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Helm_Legendary_Generic_013.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Chest_Legendary_Generic_013.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Gloves_Legendary_Generic_013.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Pants_Legendary_Generic_013.itm.json'],
    ['json\\base\\meta\\Item\\X1_QST_Boots_Legendary_Generic_013.itm.json'],
    // expansion mount
    ['json\\base\\meta\\Item\\MountReins_NahantuPanther_Cat.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor06_cat.itm.json'],
  ],
  patches: [
    {
      items: [623168],
      claimDescription: 'Complete the mount introduction quest "Donan\'s Favor".',
      claimZone: Zone.FRACTURED_PEAKS,
    },
    {
      items: [1257432],
      claimDescription: 'Complete the "Echo of Hatred" quest by killing Lilith.',
      claimZone: Zone.FRACTURED_PEAKS,
    },
    {
      items: [1472930],
      claimDescription: 'Complete the "Remembering the Fallen" side quest.',
      claimZone: Zone.HAWEZAR,
    },
    {
      items: [1867815],
      claimDescription: 'Complete the "Faithful Companion" quest in Kyovashad.',
      claimZone: Zone.FRACTURED_PEAKS,
    },
    {
      items: [459998],
      claimDescription: 'Complete the "A Pound of Flesh" side quest in Dry Steppes.',
      claimZone: Zone.DRY_STEPPES,
    },
    {
      items: [459943],
      claimDescription: 'Complete the Act 5 “Cold Blood” quest.',
      claimZone: Zone.HAWEZAR,
    },
    // expansion
    {
      items: [1947681],
      claimDescription: 'Complete the "Blood in the Grove" side quest.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1792448],
      claimDescription: 'Complete the "The Scales of History" side quest.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1970224],
      claimDescription: 'Complete the "The Witness" side quest.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1967131],
      claimDescription: 'Complete the "Final Rite" side quest.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1922168],
      claimDescription: 'Complete the "The Bestial Soul of Teganze" side quest.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1738466],
      claimDescription: 'Complete the "Beleth\'s Bane" side quest.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1936692],
      claimDescription: 'Complete the "Bloom Where you are Planted" side quest.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1913839],
      claimDescription: 'Vessel of Hatred priority quest reward.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [2021557],
      claimDescription: 'Vessel of Hatred priority quest reward.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [2021565],
      claimDescription: 'Vessel of Hatred priority quest reward.',
      claimZone: Zone.NAHANTU,
    },
    // Hatred's Armor Set:
    {
      items: [2021219],
      claimDescription: 'Vessel of Hatred priority quest reward.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [2021223],
      claimDescription: 'Vessel of Hatred priority quest reward.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [2021211],
      claimDescription: 'Vessel of Hatred priority quest reward.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [2021221],
      claimDescription: 'Vessel of Hatred priority quest reward.',
      claimZone: Zone.NAHANTU,
      unobtainable: true, // no one seems to be able to get the pants
    },
    {
      items: [2021191],
      claimDescription: 'Vessel of Hatred priority quest reward.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1825016],
      claimDescription: 'Vessel of Hatred priority quest reward; salvaged from Malefic Gaze.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1976738],
      claimDescription: 'Vessel of Hatred priority quest reward.',
      claimZone: Zone.NAHANTU,
    },
    // Baleful Intent Armor Set:
    {
      items: [1875355],
      claimDescription: 'Complete the "Deeds of a Champion" epilogue quest line.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1875351],
      claimDescription: 'Complete the "Deeds of a Champion" epilogue quest line.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1875353],
      claimDescription: 'Complete the "Deeds of a Champion" epilogue quest line.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1875357],
      claimDescription: 'Complete the "Deeds of a Champion" epilogue quest line.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1875349],
      claimDescription: 'Complete the "Deeds of a Champion" epilogue quest line.',
      claimZone: Zone.NAHANTU,
    },
    // mount + barding
    {
      items: [2008771],
      claimDescription: 'Complete the "Deeds of a Champion" epilogue quest line.',
      claimZone: Zone.NAHANTU,
    },
    {
      items: [1982034],
      claimDescription: 'Complete the "Deeds of a Champion" epilogue quest line.',
      claimZone: Zone.NAHANTU,
    },
  ],
};

const GAUNTLET: CollectionDescriptor = {
  name: 'Gauntlet',
  description: 'Transmogs earned by ranking in the gauntlet leaderboards',
  category: Category.ACTIVITY,
  claim: 'Gauntlet',
  claimDescription: 'Appear in the first 100 places in the solo or party leaderboard.',
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
    ['json\\base\\meta\\Item\\MountReins_Cat.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Albino_Cat.itm.json'],
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
  children: [TREE_OF_WHISPERS, GAUNTLET, QUEST, VENDOR],
};

export default ACTIVITY;
