import { Category, CollectionDescriptor } from '../../index.js';

const FRACTURED_PEAKS: CollectionDescriptor = {
  name: 'Fractured Peaks',
  description: 'Transmogs looted from chests within Fractured Peaks',
  category: Category.ZONE,
  items: [
    ['json\\base\\meta\\Item\\mnt_amor05_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor06_horse.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Frac_Rare.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Frac_Normal.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq06_trophy.itm.json'],
  ],
  patches: [
    {
      items: [612546],
      claimDescription: 'Drops from Silent Chests in the region.',
    },
    {
      items: [581230],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [1223987],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [1223765],
      claimDescription: 'Drops from Legion Chests in the region. BUGGED',
      unobtainable: true,
    },
    {
      items: [667310],
      claimDescription: 'Drops from World Event Chests in the region.',
    },
  ],
};

const SCOSGLEN: CollectionDescriptor = {
  name: 'Scosglen',
  description: 'Transmogs looted from chests within Scosglen',
  category: Category.ZONE,
  items: [
    ['json\\base\\meta\\Item\\mnt_amor03_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor04_horse.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Scos_Rare.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Scos_Normal.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq05_trophy.itm.json'],
  ],
  patches: [
    {
      items: [560087],
      claimDescription: 'Drops from Silent Chests in the region.',
    },
    {
      items: [569574],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [1223978],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [1040611],
      claimDescription: 'Drops from Legion Chests in the region.',
    },
    {
      items: [616554],
      claimDescription: 'Drops from World Event Chests in the region.',
    },
  ],
};

const KEHJISTAN: CollectionDescriptor = {
  name: 'Kehjistan',
  description: 'Transmogs looted from chests within Kehjistan',
  category: Category.ZONE,
  items: [
    ['json\\base\\meta\\Item\\mnt_amor09_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor10_horse.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Kehji_Rare.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Kehji_Normal.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq08_trophy.itm.json'],
  ],
  patches: [
    {
      items: [581171],
      claimDescription: 'Drops from Silent Chests in the region.',
    },
    {
      items: [611219],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [1224045],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [1223769],
      claimDescription: 'Drops from Legion Chests in the region.',
    },
    {
      items: [582279],
      claimDescription: 'Drops from World Event Chests in the region.',
    },
  ],
};

const DRY_STEPPES: CollectionDescriptor = {
  name: 'Dry Steppes',
  description: 'Transmogs looted from chests within Dry Steppes',
  category: Category.ZONE,
  items: [
    ['json\\base\\meta\\Item\\mnt_amor07_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor08_horse.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Step_Normal.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Step_Rare.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq07_trophy.itm.json'],
  ],
  patches: [
    {
      items: [569061],
      claimDescription: 'Drops from Silent Chests in the region.',
    },
    {
      items: [573657],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [1040579],
      claimDescription: 'Drops from Legion Chests in the region.',
    },
    {
      items: [1223974],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [616557],
      claimDescription: 'Drops from World Event Chests in the region.',
    },
  ],
};

const HAWEZAR: CollectionDescriptor = {
  name: 'Hawezar',
  description: 'Transmogs looted from chests within Hawezar',
  category: Category.ZONE,
  items: [
    ['json\\base\\meta\\Item\\mnt_amor11_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor12_horse.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Hawezar_Rare.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_Hawezar_Normal.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq09_trophy.itm.json'],
  ],
  patches: [
    {
      items: [586579],
      claimDescription: 'Drops from Silent Chests in the region.',
    },
    {
      items: [588264],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [1224020],
      claimDescription: 'Drops from any Helltide Chest in the region.',
    },
    {
      items: [1223767],
      claimDescription: 'Drops from Legion Chests in the region.',
    },
    {
      items: [573583],
      claimDescription: 'Drops from World Event Chests in the region.',
    },
  ],
};

const OPEN_WORLD: CollectionDescriptor = {
  name: 'Open World',
  description: 'Transmogs dropped throughout Sanctuary',
  category: Category.ZONE,
  claimDescription: 'Dropped from monsters and chests throughout Sanctuary.',
  items: [
    ['json\\base\\meta\\Item\\MountReins_SpectralHorse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor19_horse.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor02_horse.itm.json'],
  ],
};

const NIGHTMARE_DUNGEON: CollectionDescriptor = {
  name: 'Nightmare Dungeon',
  description: 'Transmogs dropped within Nightmare Dungeons',
  category: Category.ZONE,
  claimDescription: 'Dropped from monsters and chests within Nightmare Dungeons.',
  items: [
    ['json\\base\\meta\\Item\\MountReins_CaldeumHorse.itm.json'],
  ],
};

const ZONE: CollectionDescriptor = {
  name: 'Zones',
  description: 'Transmogs dropped within particular zones',
  category: Category.GENERAL,
  children: [
    FRACTURED_PEAKS,
    SCOSGLEN,
    KEHJISTAN,
    DRY_STEPPES,
    HAWEZAR,
    OPEN_WORLD,
    NIGHTMARE_DUNGEON,
  ],
};

export default ZONE;
