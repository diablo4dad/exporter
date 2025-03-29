import { WriteStream } from 'node:fs';

import { composeItemName } from '../collection/index.js';
import { captureError, captureSoftError } from '../common/logger.js';
import { resolveSno, resolveStringsList } from '../d4data/resolver.js';
import { D4Item, D4Translation } from '../d4data/struct.js';
import { getTextFromStl } from '../d4reader/strings.js';
import { D4Dependencies } from '../d4reader/struct.js';

export type ItemMapType = [string, ItemSetSubset][];
export type ItemSetSubset = [string, number][];

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

export function createAssociationMap(
  table: Map<string, D4Item>,
  translations: Map<string, D4Translation>,
  dependencies: D4Dependencies,
) {
  const { itemTypes, storeProducts } = dependencies;
  const result = new Map<string, [string, number][]>();

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

    const itemType = resolveSno(val.snoItemType, itemTypes);
    if (!itemType) {
      continue;
    }

    const itemTypeStringsList = resolveStringsList(itemType, translations);
    const itemTypeName = getTextFromStl(itemTypeStringsList, 'Name', '!uncategorized');
    if (!result.has(itemTypeName)) {
      result.set(itemTypeName, []);
    }

    const subset = result.get(itemTypeName);
    if (subset) {
      subset.push([key, snoId]);
    }
  }

  return (
    Array.from(result.entries()).map(([itemType, itemTypeSet]) => [
      itemType,
      itemTypeSet.sort(([n1], [n2]) => n1.localeCompare(n2)),
    ]) as ItemMapType
  ).sort(([n1], [n2]) => n1.localeCompare(n2));
}

export function writeSnoRefFile(table: ItemSetSubset, stream: WriteStream) {
  stream.write('// this file is auto-generated; do not edit\n');
  for (const [ref, value] of table.values()) {
    stream.write('export const ');
    stream.write(ref);
    stream.write(' = ');
    stream.write(String(value));
    stream.write(';\n');
  }
}
