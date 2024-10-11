import { D4Translation } from './struct.js';

export const MAGIC_TYPES: ReadonlyArray<string> = ['Common', 'Legendary', 'Unique', 'Magic', 'Rare'];
export const CLASS_TYPES: ReadonlyArray<string> = [
  'Sorcerer',
  'Druid',
  'Barbarian',
  'Rogue',
  'Necromancer',
  'Spiritborn',
];

export const PATH_TO_D4ITEM: Readonly<string> = 'json\\base\\meta\\Item';
export const PATH_TO_D4ITEM_TYPE: Readonly<string> = 'json\\base\\meta\\ItemType';
export const PATH_TO_D4ACTOR: Readonly<string> = 'json\\base\\meta\\Actor';
export const PATH_TO_D4EMOTE: Readonly<string> = 'json\\base\\meta\\Emote';
export const PATH_TO_D4TOWN_PORTAL: Readonly<string> = 'json\\base\\meta\\TownPortalCosmetic';
export const PATH_TO_D4MARKING_SHAPE: Readonly<string> = 'json\\base\\meta\\MarkingShape';
export const PATH_TO_D4POWER: Readonly<string> = 'json\\base\\meta\\Power';
export const PATH_TO_D4EMBLEMS: Readonly<string> = 'json\\base\\meta\\Emblem';
export const PATH_TO_D4STORE_PRODUCT: Readonly<string> = 'json\\base\\meta\\StoreProduct';
export const PATH_TO_D4PLAYER_TITLE: Readonly<string> = 'json\\base\\meta\\PlayerTitle';
export const PATH_TO_D4CHALLENGE: Readonly<string> = 'json\\base\\meta\\Challenge';
export const PATH_TO_D4ACHIEVEMENT: Readonly<string> = 'json\\base\\meta\\Achievement';
export const PATH_TO_D4REPUTATION: Readonly<string> = 'json\\base\\meta\\Reputation';
export const PATH_TO_D4STRING_LIST: Readonly<string> = 'json\\enUS_Text\\meta\\StringList';

export const FILE_EXTENSIONS: ReadonlyMap<string, string> = new Map([
  ['EmoteDefinition', '.emo'],
  ['ActorDefinition', '.acr'],
  ['TownPortalCosmeticDefinition', '.tpc'],
  ['EmblemDefinition', '.emb'],
  ['MarkingShapeDefinition', '.msh'],
  ['ItemDefinition', '.itm'],
]);

export const EMPTY_STRINGS_LIST: Readonly<D4Translation> = {
  __snoID__: -1,
  __fileName__: 'missing',
  __type__: 'missing',
  __typeHash__: 'missing',
  arStrings: [],
};
