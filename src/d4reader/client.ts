import { parseFiles } from './loader.js';
import { D4Dependencies } from './struct.js';

import {
  PATH_TO_D4ACHIEVEMENT,
  PATH_TO_D4ACTOR,
  PATH_TO_D4CHALLENGE,
  PATH_TO_D4EMBLEMS,
  PATH_TO_D4EMOTE,
  PATH_TO_D4ITEM,
  PATH_TO_D4ITEM_TYPE,
  PATH_TO_D4MARKING_SHAPE,
  PATH_TO_D4PLAYER_TITLE,
  PATH_TO_D4POWER,
  PATH_TO_D4REPUTATION,
  PATH_TO_D4STORE_PRODUCT,
  PATH_TO_D4STRING_LIST,
  PATH_TO_D4TOWN_PORTAL,
} from '../d4data/constant.js';
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

export function readD4Data(): D4Dependencies {
  const items = parseFiles<D4Item>(PATH_TO_D4ITEM);
  const itemTypes = parseFiles<D4ItemType>(PATH_TO_D4ITEM_TYPE);
  const actors = parseFiles<D4Actor>(PATH_TO_D4ACTOR);
  const strings = parseFiles<D4Translation>(PATH_TO_D4STRING_LIST);
  const emotes = parseFiles<D4Emote>(PATH_TO_D4EMOTE);
  const portals = parseFiles<D4TownPortalCosmetic>(PATH_TO_D4TOWN_PORTAL);
  const markings = parseFiles<D4MarkingShape>(PATH_TO_D4MARKING_SHAPE);
  const powers = parseFiles<D4Power>(PATH_TO_D4POWER);
  const storeProducts = parseFiles<D4StoreProduct>(PATH_TO_D4STORE_PRODUCT);
  const emblems = parseFiles<D4Emblem>(PATH_TO_D4EMBLEMS);
  const playerTitles = parseFiles<D4PlayerTitle>(PATH_TO_D4PLAYER_TITLE);
  const challenges = parseFiles<D4ChallengeDefinition>(PATH_TO_D4CHALLENGE);
  const achievements = parseFiles<D4Achievement>(PATH_TO_D4ACHIEVEMENT);
  const reputation = parseFiles<D4Reputation>(PATH_TO_D4REPUTATION);
  const headstones = new Map(Array.of(...actors.entries()).filter(([, a]) => a.__fileName__.includes('headstone')));

  console.log('Read ' + items.size + ' items...');
  console.log('Read ' + itemTypes.size + ' item types...');
  console.log('Read ' + actors.size + ' actors...');
  console.log('Read ' + strings.size + ' translations...');
  console.log('Read ' + emotes.size + ' emotes...');
  console.log('Read ' + portals.size + ' portals...');
  console.log('Read ' + markings.size + ' markings...');
  console.log('Read ' + powers.size + ' powers...');
  console.log('Read ' + storeProducts.size + ' store products...');
  console.log('Read ' + playerTitles.size + ' player titles...');
  console.log('Read ' + challenges.size + ' challenges...');

  return {
    actors,
    emblems,
    emotes,
    itemTypes,
    items,
    markings,
    portals,
    powers,
    storeProducts,
    strings,
    achievements,
    playerTitles,
    challenges,
    reputation,
    headstones,
  };
}
