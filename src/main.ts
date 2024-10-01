import fs from 'fs';
import path from 'path';
import { BUILD_DIR, ITEM_TYPES_TO_SYNC } from './config.js';
import { itemToDad } from './factory/items.js';
import { itemTypeToDad } from './factory/itemTypes.js';
import { buildCollection, D4DadDb, D4DadEntity, D4DadTranslation, ITEM_TYPE_APPENDAGE } from './json/index.js';
import { emblemToDad } from './factory/emblems.js';
import { emoteToDad } from './factory/emotes.js';
import { headstoneToDad } from './factory/headstones.js';
import { markingShapeToDad } from './factory/marking.js';
import { playerTitleToDad } from './factory/title.js';
import { portalToDad } from './factory/portals.js';
import { productToDad } from './factory/bundles.js';
import { achievementToDad } from './factory/achievements.js';
import { challengeToDad } from './factory/challenges.js';
import { pipe } from './helper.js';
import SEASON from './json/collections/season/index.js';
import ESSENTIAL from './json/collections/essential/index.js';
import CHALLENGE from './json/collections/challenge/index.js';
import PROMOTIONAL from './json/collections/promotional/index.js';
import STORE from './json/collections/shop/index.js';
import { readD4Data } from './d4reader/client.js';

const deps = readD4Data();

const dumpItems = () => {
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

  const d4dadJoin: D4DadDb = {
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

  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR);
  }

  fs.writeFileSync(path.join(BUILD_DIR, 'd4dad.json'), JSON.stringify(d4dadJoin));
  fs.writeFileSync(path.join(BUILD_DIR, 'd4dad_enUS.json'), JSON.stringify(d4dadI18n));

  console.log('Dump complete.');
};

dumpItems();
