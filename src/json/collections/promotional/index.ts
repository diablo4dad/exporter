import { Category, CollectionDescriptor } from '../../index.js';

const TWITCH: CollectionDescriptor = {
  name: 'Twitch',
  description: 'Twitch drops and support a streamer mounts',
  category: Category.PROMOTIONAL,
  children: [
    {
      name: 'Support a Streamer #2',
      description: 'Season of the Construct promotion from January 23rd, 2024 until February 26th, 2024',
      category: Category.PROMOTIONAL,
      claimDescription: 'Gift 2 subs during the Twitch promotion.',
      outOfRotation: true,
      premium: true,
      items: [
        ['json\\base\\meta\\Item\\mnt_stor030_horse.itm.json'],
      ],
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
      items: [
        ['json\\base\\meta\\Item\\mnt_stor014_horse.itm.json'],
      ],
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

const PRIME: CollectionDescriptor = {
  name: 'Prime',
  description: 'Loot for Prime Gaming members',
  category: Category.PROMOTIONAL,
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
        ['json\\base\\meta\\Item\\mnt_amor109_horse.itm.json'],
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

const CALL_OF_DUTY: CollectionDescriptor = {
  name: 'Call of Duty',
  description: '"The Haunting" event from October 17th, 2023 until November 6th, 2023',
  category: Category.PROMOTIONAL,
  claimDescription: 'Kill "The Butcher" in Call of Duty.',
  outOfRotation: true,
  premium: true,
  items: [
    ['json\\base\\meta\\Item\\Scythe_stor007.itm.json'],
  ],
};

const FRANCHISE: CollectionDescriptor = {
  name: 'Franchise Promotion',
  description: 'Redeemable codes collected from fast food chains',
  category: Category.PROMOTIONAL,
  children: [
    {
      name: 'Coco Fresh Tea',
      category: Category.PROMOTIONAL,
      claimDescription: 'Redeemable from the Coco Fresh Tea promotion.',
      outOfRotation: true,
      premium: true,
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\marking_nec001_stor.prd.json',
      ],
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
    },
    {
      name: 'Mountain Dew',
      category: Category.PROMOTIONAL,
      claimDescription: 'Redeemable from the Mountain Dew promotion.',
      outOfRotation: true,
      premium: true,
      items: [
        ['json\\base\\meta\\Item\\offHandsSorc_stor029.itm.json'],
        ['json\\base\\meta\\Item\\twoHandSword_stor022.itm.json'],
        ['json\\base\\meta\\Item\\twoHandCrossbow_stor029.itm.json'],
        ['json\\base\\meta\\Item\\mace_stor028.itm.json'],
      ],
    },
    {
      name: 'Burger King',
      category: Category.PROMOTIONAL,
      claimDescription: 'Redeemable from the Burger King promotion.',
      outOfRotation: true,
      premium: true,
      items: [
        ['json\\base\\meta\\Item\\Helm_Cosmetic_Necro_165_stor.itm.json'],
        ['json\\base\\meta\\Item\\Chest_Cosmetic_Necro_165_stor.itm.json'],
        ['json\\base\\meta\\Item\\Gloves_Cosmetic_Necro_165_stor.itm.json'],
        ['json\\base\\meta\\Item\\Pants_Cosmetic_Necro_165_stor.itm.json'],
        ['json\\base\\meta\\Item\\Boots_Cosmetic_Necromancer_165_stor.itm.json'],
      ],
    },
    {
      name: 'KFC',
      category: Category.PROMOTIONAL,
      claimDescription: 'Redeemable from the KFC promotion.',
      outOfRotation: true,
      premium: true,
      items: [
        ['json\\base\\meta\\Item\\twoHandBow_stor006.itm.json'],
        ['json\\base\\meta\\Item\\twoHandSorcStaff_stor009.itm.json'],
        ['json\\base\\meta\\Item\\twoHandPolearm_stor004.itm.json'],
        ['json\\base\\meta\\Item\\offHandsDruid_stor005.itm.json'],
        ['json\\base\\meta\\Item\\twoHandScythe_stor006.itm.json'],
      ],
    },
  ],
};

const HELL_STATION: CollectionDescriptor = {
  name: 'Hell Station',
  description: 'Participate in escape rooms events at subway stations in Korea',
  category: Category.PROMOTIONAL,
  claim: 'Promotional',
  claimDescription: 'Reward for participating in escape rooms, Korea only.',
  outOfRotation: true,
  items: [
    ['json\\base\\meta\\Item\\Sword_stor011.itm.json'],
  ],
};

const HELL_INK: CollectionDescriptor = {
  name: 'Hell\'s Ink',
  description: 'Receive either a flash tattoo or custom tattoo at a participating popup studio',
  category: Category.PROMOTIONAL,
  claimDescription: 'Receive a tattoo during the Hell\'s Ink promotion.',
  outOfRotation: true,
  items: [
    [
      'json\\base\\meta\\PlayerTitle\\prefix_mothers.pt.json',
      'json\\base\\meta\\PlayerTitle\\suffix_inked.pt.json',
    ],
  ],
};

const STEEL_SERIES: CollectionDescriptor = {
  name: 'SteelSeries',
  description: 'Bundled with Diablo IV themed hardware',
  category: Category.PROMOTIONAL,
  claimDescription: 'Included with SteelSeries hardware purchases.',
  outOfRotation: true,
  premium: true,
  items: [
    ['json\\base\\meta\\Item\\mnt_stor018_trophy.itm.json'],
  ],
};

const PROMOTIONAL = [
  TWITCH,
  PRIME,
  BLIZZCON,
  CALL_OF_DUTY,
  FRANCHISE,
  HELL_STATION,
  HELL_INK,
  STEEL_SERIES,
];

export default PROMOTIONAL;
