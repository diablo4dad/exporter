import fs from 'fs';
import path from 'path';

import { makeDb } from './collection/compiler.js';
import { ARTIFACT_NAME, BUILD_DIR } from './constants.js';
import { readD4Data } from './d4reader/client.js';

const deps = readD4Data();
const dadDb = makeDb(deps);

if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR);
}

const dest = path.join(BUILD_DIR, ARTIFACT_NAME);
const blob = JSON.stringify(dadDb);

fs.writeFileSync(dest, blob);

console.log(`Wrote ${dest}.`);
