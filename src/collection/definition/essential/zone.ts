import { Category, Chest, Zone } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const FRACTURED_PEAKS: CollectionDescriptor = {
  name: 'Fractured Peaks',
  description: 'Transmogs looted from chests within Fractured Peaks',
  category: Category.ZONE,
  claimZone: Zone.FRACTURED_PEAKS,
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
      claimChest: Chest.SILENT,
    },
    {
      items: [581230],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1223987],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1223765],
      claimChest: Chest.LEGION,
      unobtainable: true, // this one appears to be bugged
    },
    {
      items: [667310],
      claimChest: Chest.WORLD_EVENT,
    },
  ],
};

const SCOSGLEN: CollectionDescriptor = {
  name: 'Scosglen',
  description: 'Transmogs looted from chests within Scosglen',
  category: Category.ZONE,
  claimZone: Zone.SCOSGLEN,
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
      claimChest: Chest.SILENT,
    },
    {
      items: [569574],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1223978],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1040611],
      claimChest: Chest.LEGION,
    },
    {
      items: [616554],
      claimChest: Chest.WORLD_EVENT,
    },
  ],
};

const KEHJISTAN: CollectionDescriptor = {
  name: 'Kehjistan',
  description: 'Transmogs looted from chests within Kehjistan',
  category: Category.ZONE,
  claimZone: Zone.KEHJISTAN,
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
      claimChest: Chest.SILENT,
    },
    {
      items: [611219],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1224045],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1223769],
      claimChest: Chest.LEGION,
    },
    {
      items: [582279],
      claimChest: Chest.WORLD_EVENT,
    },
  ],
};

const DRY_STEPPES: CollectionDescriptor = {
  name: 'Dry Steppes',
  description: 'Transmogs looted from chests within Dry Steppes',
  category: Category.ZONE,
  claimZone: Zone.DRY_STEPPES,
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
      claimChest: Chest.SILENT,
    },
    {
      items: [573657],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1223974],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1040579],
      claimChest: Chest.LEGION,
    },
    {
      items: [616557],
      claimChest: Chest.WORLD_EVENT,
    },
  ],
};

const HAWEZAR: CollectionDescriptor = {
  name: 'Hawezar',
  description: 'Transmogs looted from chests within Hawezar',
  category: Category.ZONE,
  claimZone: Zone.HAWEZAR,
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
      claimChest: Chest.SILENT,
    },
    {
      items: [588264],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1224020],
      claimChest: Chest.HELLTIDE,
    },
    {
      items: [1223767],
      claimChest: Chest.LEGION,
    },
    {
      items: [573583],
      claimChest: Chest.WORLD_EVENT,
    },
  ],
};

const OPEN_WORLD: CollectionDescriptor = {
  name: 'Open World',
  description: 'Transmogs dropped throughout Sanctuary',
  category: Category.ZONE,
  claimDescription: 'Dropped throughout Sanctuary.',
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
  claimDescription: 'Dropped within Nightmare Dungeons.',
  items: [['json\\base\\meta\\Item\\MountReins_CaldeumHorse.itm.json']],
};

const KURAST_UNDERCITY: CollectionDescriptor = {
  name: 'Kurast Undercity',
  description: 'Transmogs dropped within Kurast Undercity',
  category: Category.ZONE,
  claimDescription: 'Obtained from Goblin Prankster chest in the Kurast Undercity.',
  items: [['json\\base\\meta\\Item\\mnt_amor01_cat.itm.json'], ['json\\base\\meta\\Item\\mnt_amor04_cat.itm.json']],
};

const ZONE: CollectionDescriptor = {
  name: 'Zone',
  description: 'Transmogs dropped within regions',
  category: Category.GENERAL,
  children: [
    FRACTURED_PEAKS,
    SCOSGLEN,
    KEHJISTAN,
    DRY_STEPPES,
    HAWEZAR,
    OPEN_WORLD,
    NIGHTMARE_DUNGEON,
    KURAST_UNDERCITY,
  ],
};

export default ZONE;
