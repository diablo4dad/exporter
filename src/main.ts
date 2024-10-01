import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import {
  D4Achievement,
  D4Actor,
  D4ChallengeDefinition,
  D4Dependencies,
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
} from './d4.js';
import { parseFiles } from './loader.js';
import { BUILD_DIR, ITEM_TYPES_TO_SYNC, PATH_TO_D4TEXTURES, PATH_TO_SERVICE_ACCOUNT_KEY } from './config.js';
import { itemToDad } from './json/factory/items.js';
import { itemTypeToDad } from './json/factory/itemTypes.js';
import { buildCollection, D4DadDb, D4DadEntity, D4DadTranslation, ITEM_TYPE_APPENDAGE } from './json/index.js';
import { emblemToDad } from './json/factory/emblems.js';
import { emoteToDad } from './json/factory/emotes.js';
import { headstoneToDad } from './json/factory/headstones.js';
import { markingShapeToDad } from './json/factory/marking.js';
import { playerTitleToDad } from './json/factory/title.js';
import { portalToDad } from './json/factory/portals.js';
import { productToDad } from './json/factory/bundles.js';
import { achievementToDad } from './json/factory/achievements.js';
import { challengeToDad } from './json/factory/challenges.js';
import { getStorage } from 'firebase-admin/storage';
import { pipe } from './helper.js';
import SEASON from './json/collections/season/index.js';
import ESSENTIAL from './json/collections/essential/index.js';
import CHALLENGE from './json/collections/challenge/index.js';
import PROMOTIONAL from './json/collections/promotional/index.js';
import STORE from './json/collections/shop/index.js';
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
} from './constants.js';

const app = admin.initializeApp({
  credential: admin.credential.cert(PATH_TO_SERVICE_ACCOUNT_KEY),
  storageBucket: 'd4log-bfc60.appspot.com',
});

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
const headstones = new Map(Array.of(...actors.entries()).filter(([, a]) => a.__fileName__.includes('headstone')));
const challenges = parseFiles<D4ChallengeDefinition>(PATH_TO_D4CHALLENGE);
const achievements = parseFiles<D4Achievement>(PATH_TO_D4ACHIEVEMENT);
const reputation = parseFiles<D4Reputation>(PATH_TO_D4REPUTATION);

const deps: D4Dependencies = {
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
};

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

const dumpItems = () => {
  const itemTypesOut = Array.from(itemTypes.values())
    .map(itemTypeToDad(deps))
    .concat(ITEM_TYPE_APPENDAGE)
    .filter(([, t]) => ITEM_TYPES_TO_SYNC.includes(t.name ?? ''));
  const itemTypeIds = itemTypesOut.map(([i]) => i.id);

  const itemsOut = Array.from(items.values())
    .map(itemToDad(deps))
    .filter(([i]) => itemTypeIds.includes(i.itemType));

  const emblemsOut = Array.from(emblems.values()).map(emblemToDad(deps));

  const emotesOut = Array.from(emotes.values()).map(emoteToDad(deps));

  const headstonesOut = Array.from(headstones.values()).map(headstoneToDad(deps));

  const markingsOut = Array.from(markings.values()).map(markingShapeToDad(deps));

  const portalsOut = Array.from(portals.values()).map(portalToDad(deps));

  const titlesOut = Array.from(playerTitles.values()).map(playerTitleToDad(deps));

  const productsOut = Array.from(storeProducts.values())
    .map(productToDad(deps))
    .filter(([sp]) => sp.item || sp.bundledProducts);

  const achievementsOut = Array.from(achievements.values()).map(achievementToDad(deps));

  const challengeOut = Array.from(challenges.values()).map(challengeToDad(deps));

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

  // uploadMissingIcons().then(() => {
  //     console.log("Uploaded missing icons.");
  // }).catch(e => {
  //     console.error("Error uploading icons", e);
  // });

  // copyImages(d4dadJoin).then(() => {
  //     console.log("Copy Images complete.");
  // }).catch(e => {
  //     console.error("Error", e);
  // })
};

const copyImages = async (d4dad: D4DadDb) => {
  const allImgHandles: Set<number> = d4dad.items.reduce((a, c) => {
    a.add(c.icon);
    if (c.invImages) {
      c.invImages.flat().map((i) => a.add(i));
    }
    return a;
  }, new Set<number>());

  allImgHandles.delete(0);

  const failedImages: number[] = [];

  const bucket = getStorage(app).bucket();

  let i = 0;
  for (const iconId of allImgHandles) {
    ++i;

    const filename = path.join(PATH_TO_D4TEXTURES, iconId + '.webp');
    try {
      fs.accessSync(filename, fs.constants.R_OK);
    } catch (err) {
      console.warn('Unable to read file ' + filename + '...');
      failedImages.push(iconId);
      continue;
    }

    // fs.copyFileSync(filename, path.join(PATH_TO_PUBLIC_DIR, iconId + ".webp"));

    if (await bucket.file(filename).exists()) {
      console.log(`[${i}] Skipping ${filename}...`);
      continue;
    }

    console.log(`[${i}] Uploading ${filename}...`);
    const resp = await bucket.upload(filename, {
      destination: 'icons/' + iconId + '.webp',
      metadata: {
        contentType: 'image/webp',
        cacheControl: 'public, max-age=31536000',
      },
    });
  }

  if (failedImages.length) {
    console.log('Missing Icons...', failedImages);
  }
};

const MISSING_ICONS = 'C:\\Users\\Sam\\Documents\\d4log\\missing_icons';

const uploadMissingIcons = async () => {
  const bucket = getStorage(app).bucket();
  let i = 0;
  for (const pathToIcon of fs.readdirSync(MISSING_ICONS)) {
    console.log('[' + ++i + '] Uploading ' + pathToIcon + '...');
    const fileName = path.basename(pathToIcon);
    const resp = await bucket.upload(path.join(MISSING_ICONS, pathToIcon), {
      destination: 'icons/' + fileName,
      metadata: {
        contentType: 'image/webp',
        cacheControl: 'public, max-age=31536000',
      },
    });
  }
};

dumpItems();
