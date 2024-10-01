// master directories
const PATH_TO_D4DATA = 'C:\\Users\\Sam\\Documents\\d4data'
const PATH_TO_D4TEXTURES = 'C:\\Users\\Sam\\Documents\\d4-texture-extractor\\webp'

const BUILD_DIR = "build";

// key data files
const PATH_TO_D4ITEM = "json\\base\\meta\\Item";
const PATH_TO_D4ITEM_TYPE = "json\\base\\meta\\ItemType";
const PATH_TO_D4ACTOR = "json\\base\\meta\\Actor";
const PATH_TO_D4STRING_LIST = "json\\enUS_Text\\meta\\StringList";
const PATH_TO_D4EMOTE = "json\\base\\meta\\Emote";
const PATH_TO_D4TOWN_PORTAL = "json\\base\\meta\\TownPortalCosmetic";
const PATH_TO_D4MARKING_SHAPE = "json\\base\\meta\\MarkingShape";
const PATH_TO_D4POWER = "json\\base\\meta\\Power";
const PATH_TO_D4EMBLEMS = "json\\base\\meta\\Emblem";
const PATH_TO_D4STORE_PRODUCT = "json\\base\\meta\\StoreProduct";
const PATH_TO_D4PLAYER_TITLE = "json\\base\\meta\\PlayerTitle";
const PATH_TO_D4CHALLENGE = "json\\base\\meta\\Challenge";
const PATH_TO_D4ACHIEVEMENT = "json\\base\\meta\\Achievement";
const PATH_TO_D4REPUTATION = "json\\base\\meta\\Reputation";

const MAX_HYDRATE_DEPTH_RECURSION = 0;

export {
  PATH_TO_D4DATA,
  PATH_TO_D4ITEM,
  PATH_TO_D4STRING_LIST,
  PATH_TO_D4TEXTURES,
  PATH_TO_D4ACTOR,
  PATH_TO_D4ITEM_TYPE,
  PATH_TO_D4EMOTE,
  PATH_TO_D4MARKING_SHAPE,
  PATH_TO_D4TOWN_PORTAL,
  PATH_TO_D4STORE_PRODUCT,
  MAX_HYDRATE_DEPTH_RECURSION,
  PATH_TO_D4EMBLEMS,
  PATH_TO_D4POWER,
  PATH_TO_D4PLAYER_TITLE,
  PATH_TO_D4CHALLENGE,
  PATH_TO_D4ACHIEVEMENT,
  PATH_TO_D4REPUTATION,
  BUILD_DIR,
};

export const ITEM_TYPES_TO_SYNC = [
  "Mount",
  "Horse Armor", "Cat Armor",
  "Trophy", "Back Trophy",
  "Axe", "Dagger", "Focus", "Mace", "Scythe", "Shield", "Sword", "Totem", "Wand", "Two-Handed Axe", "Bow", "Crossbow", "Two-Handed Mace", "Polearm", "Two-Handed Scythe", "Staff", "Two-Handed Sword",
  "Chest Armor", "Boots", "Gloves", "Helm", "Pants",
  "Body Marking", "Emote", "Town Portal", "Headstone", "Emblem",
  "Player Title (Prefix)", "Player Title (Suffix)",
  "Pet"
];
