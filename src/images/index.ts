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

const app = admin.initializeApp({
  credential: admin.credential.cert(PATH_TO_SERVICE_ACCOUNT_KEY),
  storageBucket: STORAGE_BUCKET,
});

export const copyImages = async (d4dad: D4DadDb, dest: string, upload = false) => {
  const allImgHandles: Set<number> = d4dad.items.reduce((a, c) => {
    a.add(c.icon);
    if (c.invImages) {
      c.invImages.flat().map((i) => a.add(i));
    }
    return a;
  }, new Set<number>());

  allImgHandles.delete(0);

  const failedImages: number[] = [];

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

    fs.copyFileSync(filename, path.join(dest, iconId + '.webp'));

    if (upload) {
      const bucket = getStorage(app).bucket();

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
      const resp = await bucket.upload(path.join(PATH_TO_D4TEXTURES_EXTRA, pathToIcon), {
        destination: 'icons/' + fileName,
        metadata: {
          contentType: 'image/webp',
          cacheControl: 'public, max-age=31536000',
        },
      });
    }
  }
};
