import { Category, CollectionDescriptor } from '../../index.js';

const FIRST_YEAR_ANNIVERSARY: CollectionDescriptor = {
  name: '1st Year Anniversary',
  description: 'Free from Tejal\'s Shop from June 6th, 2024 until June 20th, 2024',
  category: Category.SHOP_ITEMS,
  claimDescription: '1st Year Anniversary gift free in the cash shop.',
  outOfRotation: true,
  items: [
    ['json\\base\\meta\\Item\\mnt_stor045_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor197_horse_stor.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor200_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor201_trophy.itm.json'],
    ['json\\base\\meta\\Item\\twoHandSorcStaff_stor027.itm.json'],
    ['json\\base\\meta\\Item\\sword_stor066.itm.json'],
    ['json\\base\\meta\\Item\\Axe_stor028.itm.json'],
  ],
};

const LUNARY_AWAKENING: CollectionDescriptor = {
  name: 'Lunar Awakening',
  description: 'Chinese new year event from February 6th, 2024 until February 20th, 2024',
  category: Category.LIMITED_EVENT,
  outOfRotation: true,
  claim: 'Quest Reward',
  claimDescription: "Lunar Awakening Event quest reward.",
  achievements: [
    "json\\base\\meta\\Achievement\\LTE_LNY_Challenge_AllShrines.ach.json",
  ],
  items: [
    ['json\\base\\meta\\Item\\Wand_lunar001_lte.itm.json'],
    ['json\\base\\meta\\Item\\twoHandAxe_lunar001_lte.itm.json'],
    ['json\\base\\meta\\Item\\twoHandBow_lunar001_lte.itm.json'],
    ['json\\base\\meta\\Item\\LTE_LNY_Rep_MarkingReward.itm.json'],
    ['json\\base\\meta\\Item\\mnt_lunar001_trophy_lte.itm.json'],
    ['json\\base\\meta\\Item\\mnt_lunar001_horse.itm.json'],
  ],
};

const DARK_GIFTS: CollectionDescriptor = {
  name: 'Dark Gifts',
  description: 'Free from Tejal\'s Shop from December 20th, 2023 until December 26th 2023',
  category: Category.SHOP_ITEMS,
  claim: "Cash Shop",
  claimDescription: 'Free in the cash shop for a limited time.',
  outOfRotation: true,
  items: [
    ['json\\base\\meta\\Item\\mnt_amor102_horse_stor.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor002_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor001_trophy.itm.json'],
  ],
};

const MIDWINTER_BLIGHT: CollectionDescriptor = {
  name: 'Midwinter Blight',
  description: 'Holiday event from December 12th, 2023 until January 2nd, 2024',
  category: Category.GENERAL,
  claim: 'Vendor',
  claimDescription: 'Purchased with Midwinter Proof\'s from the event vendor.',
  outOfRotation: true,
  achievements: [
    'json\\base\\meta\\Achievement\\LTE_Hibernal_Challenge_II_KillRCH.ach.json',
  ],
  items: [
    ['json\\base\\meta\\Item\\trophy_bar001_hibernal_lte.itm.json'],
    ['json\\base\\meta\\Item\\trophy_dru001_hibernal_lte.itm.json'],
    ['json\\base\\meta\\Item\\trophy_nec001_hibernal_lte.itm.json'],
    ['json\\base\\meta\\Item\\trophy_rog001_hibernal_lte.itm.json'],
    ['json\\base\\meta\\Item\\trophy_sor001_hibernal_lte.itm.json'],
    ['json\\base\\meta\\Item\\mnt_hibernal001_trophy_lte.itm.json'],
    ['json\\base\\meta\\Item\\Axe_hibernal001_lte.itm.json'],
    ['json\\base\\meta\\Item\\Dagger_hibernal001_lte.itm.json'],
    ['json\\base\\meta\\Item\\offHandsDruid_hibernal001_lte.itm.json'],
    ['json\\base\\meta\\Item\\offHandsSorc_hibernal001_lte.itm.json'],
    ['json\\base\\meta\\Item\\Shield_hibernal001_lte.itm.json'],
    ['json\\base\\meta\\Item\\sword_hibernal001_lte.itm.json'],
    ['json\\base\\meta\\Item\\twoHandCrossbow_hibernal001_lte.itm.json'],
    ['json\\base\\meta\\Item\\twoHandSorcStaff_hibernal001_lte.itm.json'],
  ],
};

const DONATE_BLOOD_HARVEST: CollectionDescriptor = {
  name: 'Donate to the Blood Harvest',
  description: 'Rewards distributed to all players on November 22nd, 2023',
  category: Category.PROMOTIONAL,
  claimDescription: 'Distributed to players for the Blood Harvest Event.',
  outOfRotation: true,
  items: [
    ['json\\base\\meta\\Item\\Dagger_stor016.itm.json'],
    ['json\\base\\meta\\Item\\twoHandAxe_stor007.itm.json'],
    ['json\\base\\meta\\Item\\offHandsNecro_stor006.itm.json'],
    ['json\\base\\meta\\Item\\Sword_stor011.itm.json'],
    ['json\\base\\meta\\Item\\twoHandDruidStaff_stor008.itm.json'],
    ['json\\base\\meta\\Item\\Helm_Cosmetic_Barbarian_164_stor.itm.json'],
    ['json\\base\\meta\\Item\\Chest_Cosmetic_Barbarian_164_stor.itm.json'],
    ['json\\base\\meta\\Item\\Gloves_Cosmetic_Barbarian_164_stor.itm.json'],
    ['json\\base\\meta\\Item\\Pants_Cosmetic_Barbarian_164_stor.itm.json'],
    ['json\\base\\meta\\Item\\Boots_Cosmetic_Barbarian_164_stor.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor029_horse.itm.json'],
  ],
};

const EVENT: CollectionDescriptor = {
  name: 'Limited Event',
  description: 'Transmogs received from limited events',
  category: Category.GENERAL,
  children: [
    FIRST_YEAR_ANNIVERSARY,
    LUNARY_AWAKENING,
    DARK_GIFTS,
    MIDWINTER_BLIGHT,
    DONATE_BLOOD_HARVEST,
  ],
};

export default EVENT;
