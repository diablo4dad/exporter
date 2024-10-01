const PATH_TO_D4DATA = process.env.D4DAD_D4DATA_DIR ?? '';
const PATH_TO_D4TEXTURES = process.env.D4DAD_D4TEXTURES_DIR ?? '';
const PATH_TO_SERVICE_ACCOUNT_KEY = process.env.D4DAD_SERVICE_ACCOUNT ?? '';
const BUILD_DIR = 'build';
const MAX_HYDRATE_DEPTH_RECURSION = 0;

export { BUILD_DIR, MAX_HYDRATE_DEPTH_RECURSION, PATH_TO_D4DATA, PATH_TO_D4TEXTURES, PATH_TO_SERVICE_ACCOUNT_KEY };

export const ITEM_TYPES_TO_SYNC = [
  'Mount',
  'Horse Armor',
  'Cat Armor',
  'Trophy',
  'Back Trophy',
  'Axe',
  'Dagger',
  'Focus',
  'Mace',
  'Scythe',
  'Shield',
  'Sword',
  'Totem',
  'Wand',
  'Two-Handed Axe',
  'Bow',
  'Crossbow',
  'Two-Handed Mace',
  'Polearm',
  'Two-Handed Scythe',
  'Staff',
  'Two-Handed Sword',
  'Chest Armor',
  'Boots',
  'Gloves',
  'Helm',
  'Pants',
  'Body Marking',
  'Emote',
  'Town Portal',
  'Headstone',
  'Emblem',
  'Player Title (Prefix)',
  'Player Title (Suffix)',
  'Pet',
];
