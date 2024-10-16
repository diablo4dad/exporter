import fs from 'fs';
import path from 'path';

import { makeDb } from './collection/compiler.js';
import { PATH_TO_PUBLIC_DIR } from './config.js';
import { ARTIFACT_NAME, BUILD_DIR } from './constants.js';
import { readD4Data } from './d4reader/client.js';
import { copyImages, uploadMissingIcons } from './images/index.js';

const deps = readD4Data();
const dadDb = makeDb(deps);
const doUpload = false;
const skipExisting = false;

if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR);
}

const dest = path.join(PATH_TO_PUBLIC_DIR, ARTIFACT_NAME);
const blob = JSON.stringify(dadDb);

fs.writeFileSync(dest, blob);

console.log(`Wrote ${dest}.`);

const iconDest = path.join(PATH_TO_PUBLIC_DIR, 'icons');
copyImages(dadDb, iconDest, doUpload, skipExisting)
  .then(() => {
    console.log('Copy Images complete.');

    uploadMissingIcons(iconDest, doUpload)
      .then(() => {
        console.log('Uploaded missing icons.');
      })
      .catch((e) => {
        console.error('Error uploading icons', e);
      });
  })
  .catch((e) => {
    console.error('Error', e);
  });
