import fs from 'fs';
import path from 'path';

import { Command } from '@commander-js/extra-typings';

import { createAssociationMap, writeSnoRefFile } from './codegen/index.js';
import { makeDb } from './collection/compiler.js';
import { PATH_TO_PUBLIC_DIR } from './config.js';
import { ARTIFACT_NAME, BUILD_DIR } from './constants.js';
import { readD4Data } from './d4reader/client.js';
import { copyImages, uploadMissingIcons } from './images/index.js';

const program = new Command()
  .name('d4dad-export')
  .description('CLI for interacting with d4dad tools.')
  .version('1.0.0');

program
  .command('codegen')
  .description('Generates SNO ID constants.')
  .action(() => {
    const deps = readD4Data();
    const items = createAssociationMap(deps.items, deps.strings, deps.storeProducts);
    const stream = fs.createWriteStream('debug.ts');
    writeSnoRefFile(items, stream);
    stream.close();
  });

program
  .command('build')
  .description('Generates the d4dad.json.')
  .action(() => {
    const deps = readD4Data();
    const dadDb = makeDb(deps);

    if (!fs.existsSync(BUILD_DIR)) {
      fs.mkdirSync(BUILD_DIR);
    }

    const dest = path.join(PATH_TO_PUBLIC_DIR, ARTIFACT_NAME);
    const blob = JSON.stringify(dadDb);

    fs.writeFileSync(dest, blob);

    console.log(`Wrote ${dest}.`);
  });

const defaultDest = path.join(PATH_TO_PUBLIC_DIR, 'icons');

program
  .command('copy-assets')
  .description('Copies icon assets into the destination folder.')
  .option('--upload', 'uploads assets to firestore')
  .option('--skip-existing', 'prevents uploading existing files')
  .option('--destination <string>', 'directory to copy assets to', defaultDest)
  .action(async (options) => {
    const upload = !!options.upload;
    const skipExisting = !!options.skipExisting;
    const destination = options.destination;

    const deps = readD4Data();
    const dadDb = makeDb(deps);

    try {
      await copyImages(dadDb, destination, upload, skipExisting);
    } catch (e) {
      console.error('Error uploading icons.', e);
    }

    try {
      await uploadMissingIcons(destination, upload);
    } catch (e) {
      console.error('Error uploading missing icons.', e);
    }
  });

program.parse();
