import * as back_trophy from '../../../d4data/sno/back_trophy.js';
import * as bow from '../../../d4data/sno/bow.js';
import * as horse_armor from '../../../d4data/sno/horse_armor.js';
import * as mount from '../../../d4data/sno/mount.js';
import * as scythe from '../../../d4data/sno/scythe.js';
import * as two_handed_axe from '../../../d4data/sno/two_handed_axe.js';
import * as two_handed_staff from '../../../d4data/sno/two_handed_staff.js';
import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const TWITCH: CollectionDescriptor = {
  name: 'Twitch',
  description: 'Twitch drops and support a streamer mounts',
  category: Category.PROMOTIONAL,
  promotional: true,
  children: [
    {
      name: 'Twitch Drops #14',
      description: 'Tune into an eligible live stream from March 11th, 2026 until March 26th, 2026',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      // Singsplinter
      storeProducts: [
        // 'json\\base\\meta\\StoreProduct\\Bundle_Scythe_stor040.prd.json',
        // 'json\\base\\meta\\StoreProduct\\Bundle_Wand_stor047.prd.json',
      ],
    },
    {
      name: 'Twitch Drops #13',
      description: 'Tune into the developer live stream March 5th, 2026',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Scythe_stor040.prd.json',
        'json\\base\\meta\\StoreProduct\\Bundle_Wand_stor047.prd.json',
      ],
    },
    {
      name: 'Twitch Drops #12',
      description: 'Tune into an eligible live stream from December 12th, 2025 until December 26th, 2025',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Axe_stor046.prd.json'],
    },
    {
      name: 'Twitch Drops #11',
      description: 'Tune into the developer live stream December 3rd, 2026',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Sword_stor068.prd.json'],
    },
    {
      name: 'Twitch Drops #10',
      description: 'Tune into an eligible live stream from October 16th, 2025 until October 17th, 2025',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Dagger_stor053.prd.json'],
    },
    {
      name: 'Twitch Drops #9',
      description: 'Starcraft promotion from September 26th, 2025 until October 10th, 2025',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_emblem_glo061_stor.prd.json',
        'json\\base\\meta\\StoreProduct\\Bundle_emblem_glo062_stor.prd.json',
        'json\\base\\meta\\StoreProduct\\Bundle_emblem_glo060_stor.prd.json',
      ],
    },
    {
      name: 'Twitch Drops #8',
      description: 'Tune into an eligible live stream from September 23rd, 2025 until September 26th, 2025',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_twoHandPolearm_stor054.prd.json'],
    },
    {
      name: 'Twitch Drops #7',
      description: 'Tune into the developer live stream September 16th, 2025',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_twoHandBow_stor020.prd.json'],
    },
    {
      name: 'Twitch Drops #6',
      description: 'Sins of the Horadrim promotion from July 1st, 2025 until July 19th, 2025',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_twoHandCrossbow_stor034.prd.json'],
    },
    {
      name: 'Twitch Drops #5',
      description: 'Tune into the developer live stream June 27th, 2025',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_promo_twitch_26.prd.json'],
    },
    {
      name: 'Twitch Drops #4',
      description: 'Berserk promotion from April 29th, 2025 until May 13th, 2025',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_promo_twitch_25.prd.json'],
    },
    {
      name: 'Support a Streamer #4',
      description: 'Berserk promotion from May 6th, 2025 until June 3rd, 2025',
      category: Category.PROMOTIONAL,
      premium: true,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Promo_Twitch_24.prd.json'],
    },
    {
      name: 'Support a Streamer #3',
      description: 'Vessel of Hatred promotion from October 8th, 2024 until November 5th, 2024',
      category: Category.PROMOTIONAL,
      premium: true,
      outOfRotation: true,
      items: [
        ['json\\base\\meta\\Item\\mnt_stor048_horse.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor205_horse_stor.itm.json'],
      ],
      patches: [
        {
          items: [mount.GHOST_OF_THE_CONQUERED_1826175],
          claimDescription: 'Purchase or Gift 2 Twitch Subscriptions.',
        },
        {
          items: [horse_armor.GLORY_OF_THE_VICTOR_1807543],
          claimDescription: 'Purchase or Gift 4 Twitch Subscriptions.',
        },
      ],
    },
    {
      name: 'Twitch Drops #3',
      description: 'Vessel of Hatred promotion starting October 8th, 2024',
      category: Category.PROMOTIONAL,
      claim: 'Twitch Drop',
      outOfRotation: true,
      items: [
        ['json\\base\\meta\\Item\\twoHandSorcStaff_stor046.itm.json'],
        ['json\\base\\meta\\Item\\scythe_stor031.itm.json'],
        ['json\\base\\meta\\Item\\trophy_sor036_stor.itm.json'],
        ['json\\base\\meta\\Item\\trophy_nec032_stor.itm.json'],
        ['json\\base\\meta\\Item\\twoHandAxe_stor033.itm.json'],
        ['json\\base\\meta\\Item\\trophy_bar037_stor.itm.json'],
        ['json\\base\\meta\\Item\\twoHandBow_stor035.itm.json'],
        ['json\\base\\meta\\Item\\trophy_rog034_stor.itm.json'],
        ['json\\base\\meta\\Item\\twoHandDruidStaff_stor043.itm.json'],
        ['json\\base\\meta\\Item\\trophy_dru032_stor.itm.json'],
      ],
      patches: [
        {
          items: [two_handed_staff.RINGMASTERS_WORD],
          claimDescription: 'Week 1 Twitch Drop.',
        },
        {
          items: [scythe.WRANGLERS_HOOK_1957204],
          claimDescription: 'Week 1 Twitch Drop.',
        },
        {
          items: [back_trophy.GUISE_OF_THE_GRAND_VIZIER_1825560],
          claimDescription: 'Week 1 Twitch Drop.',
        },
        {
          items: [back_trophy.GUISE_OF_THE_TOMBKEEPER_1815812],
          claimDescription: 'Week 1 Twitch Drop.',
        },
        {
          items: [two_handed_axe.COMPETITORS_PRIDE_1957240],
          claimDescription: 'Week 2 Twitch Drop.',
        },
        {
          items: [back_trophy.GUISE_OF_THE_GLADIATOR_1744661],
          claimDescription: 'Week 2 Twitch Drop.',
        },
        {
          items: [bow.EXECUTIONERS_REACH_1957299],
          claimDescription: 'Week 3 Twitch Drop.',
        },
        {
          items: [back_trophy.GUISE_OF_THE_EAGLECALLER_1825236],
          claimDescription: 'Week 3 Twitch Drop.',
        },
        {
          items: [two_handed_staff.BATTLECALLERS_CROOK],
          claimDescription: 'Week 4 Twitch Drop.',
        },
        {
          items: [back_trophy.GUISE_OF_THE_BEASTLORD_1815634],
          claimDescription: 'Week 4 Twitch Drop.',
        },
      ],
    },
    {
      name: 'Support a Streamer #2',
      description: 'Season of the Construct promotion from January 23rd, 2024 until February 26th, 2024',
      category: Category.PROMOTIONAL,
      claimDescription: 'Gift 2 subs during the Twitch promotion.',
      outOfRotation: true,
      premium: true,
      items: [['json\\base\\meta\\Item\\mnt_stor030_horse.itm.json']],
    },
    {
      name: 'Twitch Drops #2',
      description: 'Season of Blood promotion starting October 17th, 2023',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      claim: 'Twitch Drop',
      items: [
        ['json\\base\\meta\\Item\\Sword_stor047.itm.json'],
        ['json\\base\\meta\\Item\\Mace_stor023.itm.json'],
        ['json\\base\\meta\\Item\\twoHandSword_stor016.itm.json'],
        ['json\\base\\meta\\Item\\twoHandDruidStaff_stor025.itm.json'],
      ],
      patches: [
        {
          items: [1581940],
          claimDescription: 'Week 1 Twitch Drop.',
        },
        {
          items: [1595773],
          claimDescription: 'Week 2 Twitch Drop.',
        },
        {
          items: [1596412],
          claimDescription: 'Week 3 Twitch Drop.',
        },
        {
          items: [1596148],
          claimDescription: 'Week 4 Twitch Drop.',
        },
      ],
    },
    {
      name: 'Support a Streamer #1',
      description: 'Twitch promotion from June 5th, 2023 until July 2nd, 2023',
      category: Category.PROMOTIONAL,
      claimDescription: 'Gift 2 subs during Twitch launch promotion.',
      outOfRotation: true,
      premium: true,
      items: [['json\\base\\meta\\Item\\mnt_stor014_horse.itm.json']],
    },
    {
      name: 'Twitch Drops #1',
      description: 'Launch promotion starting June 5th, 2023',
      category: Category.PROMOTIONAL,
      claim: 'Twitch Drop',
      outOfRotation: true,
      items: [
        ['json\\base\\meta\\Item\\trophy_rog000_dlux_stor.itm.json'],
        ['json\\base\\meta\\Item\\trophy_nec000_dlux_stor.itm.json'],
        ['json\\base\\meta\\Item\\Dagger_stor040.itm.json'],
        ['json\\base\\meta\\Item\\Sword_stor041.itm.json'],
        ['json\\base\\meta\\Item\\trophy_sor000_dlux_stor.itm.json'],
        ['json\\base\\meta\\Item\\Wand_stor019.itm.json'],
        ['json\\base\\meta\\Item\\trophy_dru000_dlux_stor.itm.json'],
        ['json\\base\\meta\\Item\\axe_stor018.itm.json'],
        ['json\\base\\meta\\Item\\trophy_bar000_dlux_stor.itm.json'],
        ['json\\base\\meta\\Item\\twoHandMace_stor015.itm.json'],
      ],
      patches: [
        {
          items: [1216945],
          claimDescription: 'Week 1 Twitch drop.',
        },
        {
          items: [1216789],
          claimDescription: 'Week 1 Twitch drop.',
        },
        {
          items: [1363030],
          claimDescription: 'Week 1 Twitch drop.',
        },
        {
          items: [1363884],
          claimDescription: 'Week 1 Twitch drop.',
        },
        {
          items: [1218243],
          claimDescription: 'Week 2 Twitch Drop.',
        },
        {
          items: [1365635],
          claimDescription: 'Week 2 Twitch Drop.',
        },
        {
          items: [1216568],
          claimDescription: 'Week 3 Twitch Drop.',
        },
        {
          items: [1364185],
          claimDescription: 'Week 3 Twitch Drop.',
        },
        {
          items: [1215544],
          claimDescription: 'Week 4 Twitch drop.',
        },
        {
          items: [1369005],
          claimDescription: 'Week 4 Twitch drop.',
        },
      ],
    },
  ],
};

const DISCORD: CollectionDescriptor = {
  name: 'Discord',
  description: 'Transmogs acquired through Discord collaborations',
  promotional: true,
  outOfRotation: true,
  category: Category.PROMOTIONAL,
  children: [
    {
      name: 'Vessel of Hatred Quest',
      description:
        'Stream yourself playing Vessel of Hatred on Discord from October 8th, 2024 until October 15th, 2024',
      claim: 'Discord Quest',
      claimDescription: 'Stream yourself playing Vessel of Hatred on Discord.',
      items: [
        ['json\\base\\meta\\Item\\dagger_stor086.itm.json'],
        ['json\\base\\meta\\Item\\sword_stor100.itm.json'],
        ['json\\base\\meta\\Item\\twoHandPolearm_stor068.itm.json'],
      ],
    },
  ],
};

const PRIME: CollectionDescriptor = {
  name: 'Prime',
  description: 'Loot for Prime Gaming members',
  category: Category.PROMOTIONAL,
  promotional: true,
  children: [
    {
      name: 'Prime Gaming #4',
      description: 'Promotion from December 14th, 2023 until January 18th, 2024',
      category: Category.PROMOTIONAL,
      claimDescription: 'Redeemable by Prime members.',
      outOfRotation: true,
      premium: true,
      items: [
        ['json\\base\\meta\\Item\\mnt_stor020_trophy.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor015_trophy.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor109_horse_stor.itm.json'],
      ],
    },
    {
      name: 'Prime Gaming #3',
      description: 'Promotion from November 17th, 2023 until December 14th, 2023',
      category: Category.PROMOTIONAL,
      claimDescription: 'Redeemable by Prime members.',
      outOfRotation: true,
      premium: true,
      items: [
        ['json\\base\\meta\\Item\\scythe_stor013.itm.json'],
        ['json\\base\\meta\\Item\\twoHandAxe_stor014.itm.json'],
      ],
    },
    {
      name: 'Prime Gaming #2',
      description: 'Promotion from September 7th, 2023 until October 12th, 2023',
      category: Category.PROMOTIONAL,
      claimDescription: 'Redeemable by Prime members.',
      outOfRotation: true,
      premium: true,
      items: [
        ['json\\base\\meta\\Item\\offHandsSorc_stor024.itm.json'],
        ['json\\base\\meta\\Item\\TwoHandCrossbow_stor024.itm.json'],
      ],
    },
    {
      name: 'Prime Gaming #1',
      description: 'Promotion from July 6th, 2023 until August 3rd, 2023',
      category: Category.PROMOTIONAL,
      claimDescription: 'Redeemable by Prime members.',
      outOfRotation: true,
      premium: true,
      items: [
        ['json\\base\\meta\\Item\\mnt_stor021_trophy.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor016_trophy.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor110_horse.itm.json'],
      ],
    },
  ],
};

const BLIZZCON: CollectionDescriptor = {
  name: 'BlizzCon 2023',
  description: 'Transmogs from the BlizzCon 2023 Collection',
  category: Category.PROMOTIONAL,
  claimDescription: 'Included in the BlizzCon Collection Epic and Legendary pack.',
  premium: true,
  promotional: true,
  items: [
    ['json\\base\\meta\\Item\\mnt_stor122_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor121_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor027_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor159_horse_stor.itm.json'],
  ],
  patches: [
    {
      items: [1576630],
      claimDescription: 'Included in the BlizzCon Collection Legendary pack.',
    },
  ],
};

// trolli #2 Piquance, Sucrëhander, Prickletongue

const TROLLI: CollectionDescriptor = {
  name: 'Trolli',
  description: 'Franchise Promotion',
  category: Category.PROMOTIONAL,
  claimDescription: 'Redeemable by submitting the barcode from Trolli candy packets.',
  premium: true,
  promotional: true,
  children: [
    {
      name: 'Trolli #1',
      description: 'Promotion running from September 1st, 2024 until February 28th, 2025.',
      claimDescription: 'Redeemable from the Trolli promotion.',
      items: [
        ['json\\base\\meta\\Item\\twoHandPolearm_stor042.itm.json'],
        ['json\\base\\meta\\Item\\mace_stor044.itm.json'],
        ['json\\base\\meta\\Item\\dagger_stor076.itm.json'],
      ],
    },
  ],
};

const DEMONS_BLOOD: CollectionDescriptor = {
  name: "CU Demon's Blood & Angel's Tears",
  description: 'Korean Convenience Store Promotion',
  category: Category.PROMOTIONAL,
  claimDescription: 'Redeemable from wine bottles purchased in Korea.',
  premium: true,
  promotional: true,
  storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_KR_RedWine_stor001.prd.json'],
};

const COCO: CollectionDescriptor = {
  name: 'Coco Fresh Tea',
  description: 'Franchise Promotion',
  category: Category.PROMOTIONAL,
  claimDescription: 'Redeemable from the Coco Fresh Tea promotion.',
  outOfRotation: true,
  premium: true,
  promotional: true,
  storeProducts: ['json\\base\\meta\\StoreProduct\\marking_nec001_stor.prd.json'],
  items: [
    ['json\\base\\meta\\Item\\axe_stor007.itm.json'],
    ['json\\base\\meta\\Item\\Shield_stor004.itm.json'],
    ['json\\base\\meta\\Item\\twoHandMace_stor007.itm.json'],
    ['json\\base\\meta\\Item\\Dagger_stor015.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor130_horse_stor.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor013_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor059_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_stor060_trophy.itm.json'],
    ['json\\base\\meta\\Item\\Helm_Cosmetic_Necro_151_stor.itm.json'],
    ['json\\base\\meta\\Item\\Chest_Cosmetic_Necro_151_stor.itm.json'],
    ['json\\base\\meta\\Item\\Gloves_Cosmetic_Necro_151_stor.itm.json'],
    ['json\\base\\meta\\Item\\Pants_Cosmetic_Necro_151_stor.itm.json'],
    ['json\\base\\meta\\Item\\Boots_Cosmetic_Necromancer_151_stor.itm.json'],
    ['json\\base\\meta\\Item\\sword_stor002.itm.json'],
    ['json\\base\\meta\\Item\\shield_stor003.itm.json'],
  ],
};

const MOUNTAIN_DEW: CollectionDescriptor = {
  name: 'Mountain Dew',
  description: 'Franchise Promotion',
  category: Category.PROMOTIONAL,
  claimDescription: 'Redeemable from the Mountain Dew promotion.',
  promotional: true,
  premium: true,
  children: [
    {
      name: 'Mountain Dew #2',
      description: 'Franchise Promotion',
      claimDescription: 'Redeemable from the Mountain Dew promotion.',
      category: Category.PROMOTIONAL,
      items: [
        ['json\\base\\meta\\Item\\twoHandGlaive_stor006.itm.json'],
        ['json\\base\\meta\\Item\\twoHandGlaive_stor022.itm.json'],
        ['json\\base\\meta\\Item\\dagger_stor077.itm.json'],
        ['json\\base\\meta\\Item\\axe_stor043.itm.json'],
        ['json\\base\\meta\\TownPortalCosmetic\\portal_glo017_stor.tpc.json'],
      ],
    },
    {
      name: 'Mountain Dew #1',
      description: 'Franchise Promotion',
      claimDescription: 'Redeemable from the Mountain Dew promotion.',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      items: [
        ['json\\base\\meta\\Item\\offHandsSorc_stor029.itm.json'],
        ['json\\base\\meta\\Item\\twoHandSword_stor022.itm.json'],
        ['json\\base\\meta\\Item\\twoHandCrossbow_stor029.itm.json'],
        ['json\\base\\meta\\Item\\mace_stor028.itm.json'],
      ],
    },
  ],
};

const BURGER_KING: CollectionDescriptor = {
  name: 'Burger King',
  description: 'Franchise Promotion',
  category: Category.PROMOTIONAL,
  claimDescription: 'Redeemable from the Burger King promotion.',
  outOfRotation: true,
  premium: true,
  promotional: true,
  items: [
    ['json\\base\\meta\\Item\\Helm_Cosmetic_Necro_165_stor.itm.json'],
    ['json\\base\\meta\\Item\\Chest_Cosmetic_Necro_165_stor.itm.json'],
    ['json\\base\\meta\\Item\\Gloves_Cosmetic_Necro_165_stor.itm.json'],
    ['json\\base\\meta\\Item\\Pants_Cosmetic_Necro_165_stor.itm.json'],
    ['json\\base\\meta\\Item\\Boots_Cosmetic_Necromancer_165_stor.itm.json'],
  ],
};

const KFC: CollectionDescriptor = {
  name: 'KFC',
  description: 'Franchise Promotion',
  category: Category.PROMOTIONAL,
  claimDescription: 'Redeemable from the KFC promotion.',
  outOfRotation: true,
  premium: true,
  promotional: true,
  items: [
    ['json\\base\\meta\\Item\\twoHandBow_stor006.itm.json'],
    ['json\\base\\meta\\Item\\twoHandSorcStaff_stor009.itm.json'],
    ['json\\base\\meta\\Item\\twoHandPolearm_stor004.itm.json'],
    ['json\\base\\meta\\Item\\offHandsDruid_stor005.itm.json'],
    ['json\\base\\meta\\Item\\twoHandScythe_stor006.itm.json'],
  ],
};

const HELL_STATION: CollectionDescriptor = {
  name: 'Hell Station',
  description: 'Participate in escape rooms events at subway stations in Korea',
  category: Category.PROMOTIONAL,
  claim: 'Promotional',
  claimDescription: 'Reward for participating in escape rooms, Korea only.',
  outOfRotation: true,
  promotional: true,
  items: [['json\\base\\meta\\Item\\Sword_stor011.itm.json']],
};

const HELL_INK: CollectionDescriptor = {
  name: "Hell's Ink",
  description: 'Receive either a flash tattoo or custom tattoo at a participating popup studio',
  category: Category.PROMOTIONAL,
  claimDescription: "Receive a tattoo during the Hell's Ink promotion.",
  outOfRotation: true,
  promotional: true,
  items: [
    ['json\\base\\meta\\PlayerTitle\\prefix_mothers.pt.json', 'json\\base\\meta\\PlayerTitle\\suffix_inked.pt.json'],
  ],
};

const GEFORCE: CollectionDescriptor = {
  name: 'GeForce',
  description: 'Participate in the GeForce LAN 50 event starting January 4th, 2025.',
  category: Category.PROMOTIONAL,
  claimDescription: 'Reward from the GeForce LAN 50 event.',
  premium: true,
  promotional: true,
  storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_MountAmor_stor129.prd.json'],
};

const CROSSOVERS: CollectionDescriptor = {
  name: 'Blizzard Crossovers',
  description: 'Transmogs acquired through Blizzard games such as World of Warcraft',
  category: Category.PROMOTIONAL,
  premium: true,
  promotional: true,
  children: [
    {
      name: 'Midnight',
      description: 'Complete the prologue "Echoes of midnight" achievement in the WoW Midnight expansion',
      category: Category.PROMOTIONAL,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor100_chickenLarge.prd.json'],
    },
    {
      name: 'The War Within',
      description: 'Included with the "The War Within" WoW expansion',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_stor005.prd.json'],
    },
    {
      name: 'Call of Duty',
      description: '"The Haunting" event from October 17th, 2023 until November 6th, 2023',
      claimDescription: 'Kill "The Butcher" in Call of Duty.',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      items: [['json\\base\\meta\\Item\\Scythe_stor007.itm.json']],
    },
  ],
};

const MERCHANDISE: CollectionDescriptor = {
  name: 'Merchandise',
  description: 'Transmogs included with Diablo IV merchandise',
  category: Category.PROMOTIONAL,
  premium: true,
  children: [
    {
      name: "Death's Head Cudgel",
      description:
        "Included with Death's Head Cudgel collection at the Blizzard Gear Store from November 10th, 2025 until December 19th, 2025",
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Promo_Mace_stor049.prd.json'],
    },
    {
      name: 'Butchers Cleaver',
      description: 'Purchase the Butchers Cleaver Replica from the Blizzard Gear Store',
      category: Category.PROMOTIONAL,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Promo_axe_stor029.prd.json'],
    },
    {
      name: 'iam8bit',
      description: 'Bundled with the Diablo IV Vinyl soundtrack.',
      claimDescription: 'Included with the Vinyl soundtrack from iam8bit.',
      category: Category.PROMOTIONAL,
      items: [['json\\base\\meta\\Item\\mnt_stor223_trophy.itm.json']],
    },
    {
      name: 'SteelSeries',
      description: 'Bundled with Diablo IV themed hardware',
      claimDescription: 'Included with SteelSeries hardware purchases.',
      category: Category.PROMOTIONAL,
      outOfRotation: true,
      items: [['json\\base\\meta\\Item\\mnt_stor018_trophy.itm.json']],
    },
  ],
};

const PROMOTIONAL = [
  TWITCH,
  MERCHANDISE,
  CROSSOVERS,
  BLIZZCON,
  DISCORD,
  PRIME,
  TROLLI,
  MOUNTAIN_DEW,
  DEMONS_BLOOD,
  COCO,
  BURGER_KING,
  KFC,
  GEFORCE,
  HELL_STATION,
  HELL_INK,
];

export default PROMOTIONAL;
