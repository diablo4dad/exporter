import fs from 'fs';
import path from 'path';
import { BUILD_DIR } from './config.js';
import { readD4Data } from './d4reader/client.js';
import { makeDb } from './collection/compiler.js';

const deps = readD4Data();
const dadDb = makeDb(deps);

if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR);
}

fs.writeFileSync(path.join(BUILD_DIR, 'd4dad.json'), JSON.stringify(dadDb));

console.log('Dump complete.');
