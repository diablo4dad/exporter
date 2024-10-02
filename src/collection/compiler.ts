import { ITEM_TYPE_APPENDAGE, USED_ITEM_TYPES } from './constants.js';
import CHALLENGE from './definition/challenge/index.js';
import ESSENTIAL from './definition/essential/index.js';
import PROMOTIONAL from './definition/promotional/index.js';
import SEASON from './definition/season/index.js';
import STORE from './definition/shop/index.js';
import { achievementToDad } from './parser/achievements.js';
import { productToDad } from './parser/bundles.js';
import { challengeToDad } from './parser/challenges.js';
import { emblemToDad } from './parser/emblems.js';
import { emoteToDad } from './parser/emotes.js';
import { headstoneToDad } from './parser/headstones.js';
import { itemToDad } from './parser/items.js';
import { itemTypeToDad } from './parser/itemTypes.js';
import { markingShapeToDad } from './parser/marking.js';
import { portalToDad } from './parser/portals.js';
import { playerTitleToDad } from './parser/title.js';
import { D4DadDb, D4DadEntity, D4DadTranslation } from './struct.js';

import { D4Dependencies } from '../d4reader/struct.js';
import { pipe } from '../helper.js';

import { buildCollection } from './index.js';

export function makeDb(deps: D4Dependencies): D4DadDb {
  const itemTypesOut = Array.from(deps.itemTypes.values())
    .map(itemTypeToDad(deps))
    .concat(ITEM_TYPE_APPENDAGE)
    .filter(([, t]) => USED_ITEM_TYPES.includes(t.name ?? ''));
  const itemTypeIds = itemTypesOut.map(([i]) => i.id);

  const itemsOut = Array.from(deps.items.values())
    .map(itemToDad(deps))
    .filter(([i]) => itemTypeIds.includes(i.itemType));

  const emblemsOut = Array.from(deps.emblems.values()).map(emblemToDad(deps));

  const emotesOut = Array.from(deps.emotes.values()).map(emoteToDad(deps));

  const headstonesOut = Array.from(deps.headstones.values()).map(headstoneToDad(deps));

  const markingsOut = Array.from(deps.markings.values()).map(markingShapeToDad(deps));

  const portalsOut = Array.from(deps.portals.values()).map(portalToDad(deps));

  const titlesOut = Array.from(deps.playerTitles.values()).map(playerTitleToDad(deps));

  const productsOut = Array.from(deps.storeProducts.values())
    .map(productToDad(deps))
    .filter(([sp]) => sp.item || sp.bundledProducts);

  const achievementsOut = Array.from(deps.achievements.values()).map(achievementToDad(deps));

  const challengeOut = Array.from(deps.challenges.values()).map(challengeToDad(deps));

  const general = ESSENTIAL.map(buildCollection(deps));
  const seasons = SEASON.map(buildCollection(deps));
  const challenge = pipe(CHALLENGE, buildCollection(deps)).subcollections;
  const store = STORE.map(buildCollection(deps));
  const promotional = PROMOTIONAL.map(buildCollection(deps));
  const collections = [...general, ...seasons, ...challenge, ...store, ...promotional];

  const mapTranslations = <T extends D4DadEntity>([entity, i18n]: [T, D4DadTranslation]): [
    number,
    D4DadTranslation,
  ] => [entity.id, i18n];
  const mapEntitiesCoalesce = <T extends D4DadEntity>([entity, i18n]: [T, D4DadTranslation]): T & D4DadTranslation => ({
    ...i18n,
    ...entity,
  });

  const d4dadI18n = Object.fromEntries([
    ...itemTypesOut.map(mapTranslations),
    ...itemsOut.map(mapTranslations),
    ...emblemsOut.map(mapTranslations),
    ...emotesOut.map(mapTranslations),
    ...headstonesOut.map(mapTranslations),
    ...markingsOut.map(mapTranslations),
    ...portalsOut.map(mapTranslations),
    ...titlesOut.map(mapTranslations),
    ...productsOut.map(mapTranslations),
    ...challengeOut.map(mapTranslations),
    ...achievementsOut.map(mapTranslations),
  ]);

  return {
    collections: collections,
    itemTypes: itemTypesOut.map(mapEntitiesCoalesce),
    products: [],
    achievements: [],
    challenges: [],
    items: [
      ...itemsOut.map(mapEntitiesCoalesce),
      ...emblemsOut.map(mapEntitiesCoalesce),
      ...emotesOut.map(mapEntitiesCoalesce),
      ...headstonesOut.map(mapEntitiesCoalesce),
      ...markingsOut.map(mapEntitiesCoalesce),
      ...portalsOut.map(mapEntitiesCoalesce),
      ...titlesOut.map(mapEntitiesCoalesce),
    ],
  };
}
