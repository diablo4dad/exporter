import {
  D4Achievement,
  D4Actor,
  D4ChallengeDefinition,
  D4Emblem,
  D4Emote,
  D4Item,
  D4ItemType,
  D4MarkingShape,
  D4PlayerTitle,
  D4Power,
  D4Reputation,
  D4StoreProduct,
  D4TownPortalCosmetic,
  D4Translation,
} from '../d4data/struct.js';

export type D4Dependencies = {
  actors: Map<string, D4Actor>;
  strings: Map<string, D4Translation>;
  items: Map<string, D4Item>;
  itemTypes: Map<string, D4ItemType>;
  powers: Map<string, D4Power>;
  storeProducts: Map<string, D4StoreProduct>;
  emotes: Map<string, D4Emote>;
  markings: Map<string, D4MarkingShape>;
  portals: Map<string, D4TownPortalCosmetic>;
  emblems: Map<string, D4Emblem>;
  achievements: Map<string, D4Achievement>;
  playerTitles: Map<string, D4PlayerTitle>;
  challenges: Map<string, D4ChallengeDefinition>;
  reputation: Map<string, D4Reputation>;
  headstones: Map<string, D4Actor>;
};
