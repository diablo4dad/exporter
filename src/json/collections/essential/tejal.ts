import { Category, CollectionDescriptor } from '../../index.js';

const FIRST_YEAR_ANNIVERSARY: CollectionDescriptor = {
  name: '1st Year Anniversary',
  description: 'Free from Tejal\'s Shop from June 6th, 2024 until June 20th, 2024',
  category: Category.SHOP_ITEMS,
  claimDescription: 'Free from the cash shop for a limited time.',
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

const DARK_GIFTS: CollectionDescriptor = {
  name: 'Dark Gifts',
  description: 'Free from Tejal\'s Shop from December 20th, 2023 until December 26th 2023',
  category: Category.SHOP_ITEMS,
  claim: 'Cash Shop',
  claimDescription: 'Free from the cash shop for a limited time.',
  outOfRotation: true,
  items: [
    ['json\\base\\meta\\Item\\mnt_amor102_horse_stor.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor002_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor001_trophy.itm.json'],
  ],
};

const MOTHERS_FAVOR: CollectionDescriptor = {
  name: 'Mother\'s Favor',
  description: 'Free weapon cosmetics',
  category: Category.SHOP_ITEMS,
  claimDescription: 'Occasionally free from the cash shop.',
  items: [
    ['json\\base\\meta\\Item\\twoHandSword_stor005.itm.json'],
    ['json\\base\\meta\\Item\\offHandsSorc_stor009.itm.json'],
    ['json\\base\\meta\\Item\\TwoHandCrossbow_stor003.itm.json'],
    ['json\\base\\meta\\Item\\Mace_stor007.itm.json'],
    ['json\\base\\meta\\Item\\Wand_stor007.itm.json'],
    ['json\\base\\meta\\Item\\twoHandDruidStaff_stor008.itm.json'],
    ['json\\base\\meta\\Item\\Sword_stor011.itm.json'],
    ['json\\base\\meta\\Item\\offHandsNecro_stor006.itm.json'],
    ['json\\base\\meta\\Item\\Dagger_stor016.itm.json'],
    ['json\\base\\meta\\Item\\twoHandAxe_stor007.itm.json'],
    ['json\\base\\meta\\Item\\Sword_stor010.itm.json'],
  ],
};

const RETURNING_CHAMPION: CollectionDescriptor = {
  name: 'Returning Champion',
  description: 'Free weapon cosmetics',
  category: Category.SHOP_ITEMS,
  claimDescription: 'Occasionally free from the cash shop.',
  items: [
    ['json\\base\\meta\\Item\\Dagger_stor040.itm.json'],
    ['json\\base\\meta\\Item\\Sword_stor041.itm.json'],
    ['json\\base\\meta\\Item\\Wand_stor019.itm.json'],
    ['json\\base\\meta\\Item\\axe_stor018.itm.json'],
    ['json\\base\\meta\\Item\\twoHandMace_stor015.itm.json'],
    ['json\\base\\meta\\Item\\twoHandDruidStaff_stor025.itm.json'],
    ['json\\base\\meta\\Item\\twoHandSword_stor016.itm.json'],
    ['json\\base\\meta\\Item\\Mace_stor023.itm.json'],
    ['json\\base\\meta\\Item\\Sword_stor047.itm.json'],
    ['json\\base\\meta\\Item\\shield_stor013.itm.json'],
    ['json\\base\\meta\\Item\\TwoHandCrossbow_stor024.itm.json'],
    ['json\\base\\meta\\Item\\offHandsSorc_stor024.itm.json'],
    ['json\\base\\meta\\Item\\twoHandAxe_stor014.itm.json'],
    ['json\\base\\meta\\Item\\scythe_stor013.itm.json'],
  ],
};

const THE_HUNGER: CollectionDescriptor = {
  name: 'The Hunger',
  description: 'Free weapon cosmetics',
  category: Category.SHOP_ITEMS,
  claimDescription: 'Occasionally free from the cash shop.',
  items: [
    ['json\\base\\meta\\Item\\twoHandBow_stor006.itm.json'],
    ['json\\base\\meta\\Item\\twoHandSorcStaff_stor009.itm.json'],
    ['json\\base\\meta\\Item\\twoHandPolearm_stor004.itm.json'],
    ['json\\base\\meta\\Item\\offHandsDruid_stor005.itm.json'],
    ['json\\base\\meta\\Item\\twoHandScythe_stor006.itm.json'],
  ],
};

const TEJAL: CollectionDescriptor = {
  name: 'Tejal\'s Gifts',
  description: 'Transmogs acquired from Tejal\'s Shop on a limited basis',
  category: Category.GENERAL,
  children: [
    FIRST_YEAR_ANNIVERSARY,
    DARK_GIFTS,
    MOTHERS_FAVOR,
    RETURNING_CHAMPION,
    THE_HUNGER,
  ],
};

export default TEJAL;
