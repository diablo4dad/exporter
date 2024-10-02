import { itemTypeToDad } from '../factory/itemTypes.js';
import { buildCollection, D4DadDb, D4DadEntity, D4DadTranslation, ITEM_TYPE_APPENDAGE } from './index.js';
import { ITEM_TYPES_TO_SYNC } from '../config.js';
import { itemToDad } from '../factory/items.js';
import { emblemToDad } from '../factory/emblems.js';
import { emoteToDad } from '../factory/emotes.js';
import { headstoneToDad } from '../factory/headstones.js';
import { markingShapeToDad } from '../factory/marking.js';
import { portalToDad } from '../factory/portals.js';
import { playerTitleToDad } from '../factory/title.js';
import { productToDad } from '../factory/bundles.js';
import { achievementToDad } from '../factory/achievements.js';
import { challengeToDad } from '../factory/challenges.js';
import ESSENTIAL from './collections/essential/index.js';
import SEASON from './collections/season/index.js';
import { pipe } from '../helper.js';
import CHALLENGE from './collections/challenge/index.js';
import STORE from './collections/shop/index.js';
import PROMOTIONAL from './collections/promotional/index.js';
import { D4Dependencies } from '../d4reader/struct.js';

export function makeDb(deps: D4Dependencies): D4DadDb {
  const itemTypesOut = Array.from(deps.itemTypes.values())
    .map(itemTypeToDad(deps))
    .concat(ITEM_TYPE_APPENDAGE)
    .filter(([, t]) => ITEM_TYPES_TO_SYNC.includes(t.name ?? ''));
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
