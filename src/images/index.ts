import fs from 'fs';
import path from 'path';

import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';

import { D4DadDb } from '../collection/struct.js';
import {
  PATH_TO_D4TEXTURES,
  PATH_TO_D4TEXTURES_EXTRA,
  PATH_TO_SERVICE_ACCOUNT_KEY,
  STORAGE_BUCKET,
} from '../config.js';

const ICON_UPLOAD_CACHE_FILE = path.resolve(process.cwd(), '.icon-upload-cache');

const app = admin.initializeApp({
  credential: admin.credential.cert(PATH_TO_SERVICE_ACCOUNT_KEY),
  storageBucket: STORAGE_BUCKET,
});

const loadIconUploadCache = () => {
  if (!fs.existsSync(ICON_UPLOAD_CACHE_FILE)) {
    return new Set<string>();
  }

  return fs
    .readFileSync(ICON_UPLOAD_CACHE_FILE, 'utf8')
    .split(/\r?\n/)
    .reduce((cache, line) => {
      const fileName = line.trim();
      if (fileName) {
        cache.add(fileName);
      }
      return cache;
    }, new Set<string>());
};

const writeIconUploadCacheEntry = (fileName: string) => {
  fs.appendFileSync(ICON_UPLOAD_CACHE_FILE, fileName + '\n');
};

export const copyImages = async (d4dad: D4DadDb, dest: string, upload = false, skipExisting = true) => {
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
  const uploadCache = upload ? loadIconUploadCache() : new Set<string>();

  let i = 0;
  for (const iconId of allImgHandles) {
    ++i;

    const fileName = iconId + '.webp';
    const filename = path.join(PATH_TO_D4TEXTURES, fileName);
    try {
      fs.accessSync(filename, fs.constants.R_OK);
    } catch (err) {
      console.warn('Unable to read file ' + filename + '...');
      failedImages.push(iconId);
      continue;
    }

    fs.copyFileSync(filename, path.join(dest, iconId + '.webp'));

    if (upload) {
      if (uploadCache.has(fileName)) {
        console.log(`[${i}] Skipping cached ${fileName}...`);
        continue;
      }

      if (skipExisting) {
        if (await bucket.file(filename).exists()) {
          console.log(`[${i}] Skipping ${filename}...`);
          continue;
        }
      }

      console.log(`[${i}] Uploading ${filename}...`);
      await bucket.upload(filename, {
        destination: 'icons/' + fileName,
        metadata: {
          contentType: 'image/webp',
          cacheControl: 'public, max-age=31536000',
        },
      });
      writeIconUploadCacheEntry(fileName);
      uploadCache.add(fileName);
    }
  }

  if (failedImages.length) {
    console.log('Missing Icons...', failedImages);
  }
};

export const uploadMissingIcons = async (dest: string, upload = false) => {
  const bucket = getStorage(app).bucket();
  let i = 0;
  for (const pathToIcon of fs.readdirSync(PATH_TO_D4TEXTURES_EXTRA)) {
    fs.copyFileSync(path.join(PATH_TO_D4TEXTURES_EXTRA, pathToIcon), path.join(dest, pathToIcon));

    if (upload) {
      console.log('[' + ++i + '] Uploading ' + pathToIcon + '...');
      const fileName = path.basename(pathToIcon);
      await bucket.upload(path.join(PATH_TO_D4TEXTURES_EXTRA, pathToIcon), {
        destination: 'icons/' + fileName,
        metadata: {
          contentType: 'image/webp',
          cacheControl: 'public, max-age=31536000',
        },
      });
    }
  }
};
