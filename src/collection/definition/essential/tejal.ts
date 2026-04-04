import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const APRIL_FOWLS: CollectionDescriptor = {
  name: 'April Fowls',
  description: "Free from Tejal's Shop from April 1st, 2026 until April 7th, 2026",
  category: Category.SHOP_ITEMS,
  claimDescription: 'Free from the cash shop for a limited time.',
  // Quake Before the Hatchling
  items: [['json\\base\\meta\\Emblem\\emblem_glo073_stor.emb.json']],
};

const DOOM: CollectionDescriptor = {
  name: 'Doom: Age of the Slayer',
  description: "Free from Tejal's Shop from March 11th, 2026 until April 26th, 2026",
  category: Category.SHOP_ITEMS,
  claimDescription: 'Free from the cash shop for a limited time.',
  // Dark before the Dawn (Emblem) (03.11.2026)
  // Grandeur of the Gutted (Emblem) (03.13.2026)
  // Rip and Tear (Emblem) (03.15.2026)
  items: [
    ['json\\base\\meta\\Emblem\\emblem_glo073_stor.emb.json'],
    ['json\\base\\meta\\Emblem\\emblem_glo072_stor.emb.json'],
    ['json\\base\\meta\\Emblem\\emblem_glo074_stor.emb.json'],
  ],
};

const MARCH_OF_THE_GOBLINS: CollectionDescriptor = {
  name: 'March of the Goblins',
  description: "Free from Tejal's Shop from December 18th, 2025 until January 6th, 2026",
  category: Category.SHOP_ITEMS,
  claimDescription: 'Free from the cash shop for a limited time.',
  items: [
    ['json\\base\\meta\\Item\\mnt_stor299_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor298_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor224_horse_stor.itm.json'],
  ],
};

const COMMUNITY_DELIGHTS: CollectionDescriptor = {
  name: 'Community Delights',
  description: 'Free gifts for "Vessel of Hatred" expansion owners',
  category: Category.SHOP_ITEMS,
  claimDescription: 'Free from the cash shop for a limited time.',
  items: [
    ['json\\base\\meta\\Item\\cmp_stor105_dogLarge.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor303_trophy.itm.json'],
    ['json\\base\\meta\\Emblem\\emblem_glo075_stor.emb.json'],
  ],
};

const STARCRAFT: CollectionDescriptor = {
  name: 'StarCraft x Diablo IV',
  description: "Free from Tejal's Shop from September 26th, 2025 until October 10th, 2025",
  category: Category.SHOP_ITEMS,
  claimDescription: 'Free from the cash shop for a limited time.',
  items: [
    ['json\\base\\meta\\Item\\mace_stor060.itm.json'],
    ['json\\base\\meta\\Item\\twoHandPolearm_stor078.itm.json'],
    ['json\\base\\meta\\Item\\twoHandCrossbow_stor059.itm.json'],
    ['json\\base\\meta\\Emblem\\emblem_glo073_stor.emb.json'],
    ['json\\base\\meta\\Emblem\\emblem_glo072_stor.emb.json'],
    ['json\\base\\meta\\Emblem\\emblem_glo074_stor.emb.json'],
  ],
};

const MACABRE_CELEBRATION: CollectionDescriptor = {
  name: 'Macabre Celebration',
  description: "Free from Tejal's Shop from October 29th, 2024 until November 5th 2024",
  category: Category.SHOP_ITEMS,
  claimDescription: 'Free from the cash shop for a limited time.',
  items: [
    ['json\\base\\meta\\Item\\mnt_stor044_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor198_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor199_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor196_horse_stor.itm.json'],
  ],
};

const HATRED_RISING_FREEBIES: CollectionDescriptor = {
  name: 'Season of Hatred Rising Gifts',
  description: "Free from Tejal's Shop from October 8th, 2024",
  category: Category.SHOP_ITEMS,
  claimDescription: 'Free from the cash shop for a limited time.',
  items: [
    ['json\\base\\meta\\Item\\twoHandPolearm_stor030.itm.json'],
    ['json\\base\\meta\\Item\\sword_stor067.itm.json'],
    ['json\\base\\meta\\Item\\twoHandAxe_stor038.itm.json'],
  ],
};

const FIRST_YEAR_ANNIVERSARY: CollectionDescriptor = {
  name: '1st Year Anniversary',
  description: "Free from Tejal's Shop from June 6th, 2024 until June 20th, 2024",
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
  description: "Free from Tejal's Shop from December 20th, 2023 until December 26th 2023",
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

const CHARGE_OF_THE_DEVASTATOR: CollectionDescriptor = {
  name: 'Charge of the Devastator',
  description: 'Free mount armor cosmetics',
  category: Category.SHOP_ITEMS,
  claimDescription: 'Occasionally free from the cash shop.',
  storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_MountAmor_stor200.prd.json'],
};

const KEHJISTAN_MERCHANT: CollectionDescriptor = {
  name: 'Kehjistan Merchant',
  description: 'Free mount armor cosmetics',
  category: Category.SHOP_ITEMS,
  claimDescription: 'Occasionally free from the cash shop.',
  storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_stor031_HM.prd.json'],
};

const THE_GREAT_HUNT: CollectionDescriptor = {
  name: 'The Great Hunt',
  description: 'Free mount armor cosmetics',
  category: Category.SHOP_ITEMS,
  claimDescription: 'Occasionally free from the cash shop.',
  storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_MountAmor_stor151.prd.json'],
};

const FLESHROT_OVERGROWTH: CollectionDescriptor = {
  name: 'Fleshrot Overgrowth',
  description: 'Free mount armor cosmetics',
  category: Category.SHOP_ITEMS,
  claimDescription: 'Occasionally free from the cash shop.',
  storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_stor004.prd.json'],
};

const MOTHERS_FAVOR: CollectionDescriptor = {
  name: "Mother's Favor",
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
  patches: [
    {
      items: [1237309],
      unobtainable: true,
    },
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
    ['json\\base\\meta\\Item\\offHandsNecro_stor023.itm.json'],
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

const THORNS_OF_CLARET: CollectionDescriptor = {
  name: 'Thorns of Claret',
  description: 'Free weapon cosmetics',
  claimDescription: 'Occasionally free from the cash shop.',
  premium: true,
  promotional: true,
  storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_KR_RedWine_stor001.prd.json'],
};

const HIGHLAND_NECTAR: CollectionDescriptor = {
  name: 'Highland Nectar',
  description: 'Free weapon cosmetics',
  claimDescription: 'Occasionally free from the cash shop.',
  items: [
    ['json\\base\\meta\\Item\\offHandsSorc_stor029.itm.json'],
    ['json\\base\\meta\\Item\\twoHandSword_stor022.itm.json'],
    ['json\\base\\meta\\Item\\twoHandCrossbow_stor029.itm.json'],
    ['json\\base\\meta\\Item\\mace_stor028.itm.json'],
  ],
};

const TEJAL: CollectionDescriptor = {
  name: "Tejal's Gifts",
  description: "Transmogs acquired from Tejal's Shop on a limited basis",
  category: Category.GENERAL,
  children: [
    // APRIL_FOWLS
    // DOOM,
    MARCH_OF_THE_GOBLINS,
    COMMUNITY_DELIGHTS,
    STARCRAFT,
    MACABRE_CELEBRATION,
    HATRED_RISING_FREEBIES,
    FIRST_YEAR_ANNIVERSARY,
    DARK_GIFTS,
    CHARGE_OF_THE_DEVASTATOR,
    KEHJISTAN_MERCHANT,
    THE_GREAT_HUNT,
    FLESHROT_OVERGROWTH,
    MOTHERS_FAVOR,
    RETURNING_CHAMPION,
    THE_HUNGER,
    THORNS_OF_CLARET,
    HIGHLAND_NECTAR,
  ],
};

export default TEJAL;
