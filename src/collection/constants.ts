import { D4DadItemType, D4DadTranslation } from './struct.js';

export enum Category {
  GENERAL = 'General',
  SHOP_ITEMS = 'Shop',
  PROMOTIONAL = 'Promotional',
  SEASONS = 'Season',
  CHALLENGE = 'Challenge',
  // sub-categories
  BATTLE_PASS = 'Battle Pass',
  SEASON_JOURNEY = 'Season Journey',
  REPUTATION = 'Reputation',
  ZONE = 'Zone',
  MONSTER_DROP = 'Monster Drop',
  LIMITED_EVENT = 'Limited Event',
  PVP = 'PvP',
  ACTIVITY = 'Activity',
  ARMOR = 'Armor',
  WEAPON = 'Weapon',
}

export enum D4DadCollectionCategory {
  GENERAL = 'general',
  SEASONS = 'seasons',
  CHALLENGES = 'challenges',
  PROMOTIONAL = 'promotional',
  STORE = 'store',
}

export enum Source {
  CHALLENGE_FILE,
  ACHIEVEMENT,
  STORE_PRODUCT,
}

export const BODY_MARKING = 7200;
export const EMOTE = 7201;
export const TOWN_PORTAL = 7202;
export const HEADSTONE = 7203;
export const EMBLEM = 7204;
export const PLAYER_TITLE_PREFIX = 7205;
export const PLAYER_TITLE_SUFFIX = 7206;

export const ITEM_TYPE_APPENDAGE: ReadonlyArray<[D4DadItemType, D4DadTranslation]> = [
  [{ id: BODY_MARKING }, { name: 'Body Marking' }],
  [{ id: EMOTE }, { name: 'Emote' }],
  [{ id: TOWN_PORTAL }, { name: 'Town Portal' }],
  [{ id: HEADSTONE }, { name: 'Headstone' }],
  [{ id: EMBLEM }, { name: 'Emblem' }],
  [{ id: PLAYER_TITLE_PREFIX }, { name: 'Player Title (Prefix)' }],
  [{ id: PLAYER_TITLE_SUFFIX }, { name: 'Player Title (Suffix)' }],
];

export const USED_ITEM_TYPES: ReadonlyArray<string> = [
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
