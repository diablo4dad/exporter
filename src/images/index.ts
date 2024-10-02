import fs from 'fs';
import path from 'path';

import admin from 'firebase-admin';
import { getStorage } from 'firebase-admin/storage';

import { D4DadDb } from '../collection/index.js';
import { PATH_TO_D4TEXTURES, PATH_TO_SERVICE_ACCOUNT_KEY } from '../config.js';

const app = admin.initializeApp({
  credential: admin.credential.cert(PATH_TO_SERVICE_ACCOUNT_KEY),
  storageBucket: 'd4log-bfc60.appspot.com',
});

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
