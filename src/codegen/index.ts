import { WriteStream } from 'node:fs';

import { composeItemName } from '../collection/index.js';
import { captureError, captureSoftError } from '../common/logger.js';
import { D4Entity, D4StoreProduct, D4Translation } from '../d4data/struct.js';

function nameToKey(name: string, snoId: number): string {
  const result = name
    .replaceAll(/[^a-zA-Z\d\s:]/g, '')
    .replaceAll(' ', '_')
    .replaceAll(':', '')
    .replaceAll('\u00A0', '') // NBSP
    .replaceAll('\u202F', '') // NNBSP
    .replaceAll('\r\n', '')
    .toUpperCase()
    .concat('_', String(snoId));

  if (result.charAt(0).search(/[0-9]/g) === 0) {
    return '_' + result;
  }

  return result;
}

export function createAssociationMap<T extends D4Entity>(
  table: Map<string, T>,
  translations: Map<string, D4Translation>,
  storeProducts: Map<string, D4StoreProduct>,
): Map<string, number> {
  const result = new Map<string, number>();

  for (const [ref, val] of table.entries()) {
    const snoId = val.__snoID__;
    const name = composeItemName(val, translations, storeProducts);
    if (!name) {
      captureSoftError('Could not find name of ' + ref);
      continue;
    }

    const key = nameToKey(name, snoId);
    if (result.has(key)) {
      captureError('Result already has item key ' + key, ref);
      continue;
    }

    result.set(key, snoId);
  }

  return result;
}

export function writeSnoRefFile(table: Map<string, number>, stream: WriteStream) {
  for (const [ref, value] of table.entries()) {
    stream.write('export const ');
    stream.write(ref);
    stream.write(' = ');
    stream.write(String(value));
    stream.write(';\n');
  }
}
