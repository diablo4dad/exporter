import path from 'path';

import { EMPTY_STRINGS_LIST, FILE_EXTENSIONS, PATH_TO_D4STRING_LIST } from './constant.js';
import { D4Entity, D4SnoRef, D4StoreProduct, D4Translation } from './struct.js';

import { captureError } from '../common/logger.js';

export function resolveSno<T>(ref: D4SnoRef | null, lookup: Map<string, T>): T | undefined {
  if (!ref) {
    return;
  }

  // prettier-ignore
  const targetFileName = path
    .join('json', `${ref.__targetFileName__}.json`)
    .replace('/', '\\');

  return lookup.get(targetFileName);
}

export function resolveStoreProduct(ref: D4Entity, lookup: Map<string, D4StoreProduct>): D4StoreProduct | undefined {
  const ext = FILE_EXTENSIONS.get(ref.__type__);
  if (!ext) {
    captureError('File extension not registered.', ref);
    return;
  }

  const type = ref.__type__.replace('Definition', '');
  // prettier-ignore
  const targetFileName = ref.__fileName__
    .replace(type, 'StoreProduct')
    .replace(ext, '.prd');

  // prettier-ignore
  const targetFileNameKey = path
    .join('json', targetFileName + '.json')
    .replace('/', '\\');

  return lookup.get(targetFileNameKey);
}

export function resolveStringsList(ref: D4Entity | undefined, lookup: Map<string, D4Translation>): D4Translation {
  if (!ref) {
    return EMPTY_STRINGS_LIST;
  }

  const stlName = inferStl(ref);
  const stlPath = path.join(PATH_TO_D4STRING_LIST, stlName);

  const stl = lookup.get(stlPath);
  if (!stl) {
    captureError('StringsList not found.', stlPath);
    return EMPTY_STRINGS_LIST;
  }

  return stl;
}

function inferStl(ref: D4Entity): string {
  const refType = ref.__type__;
  const refName = ref.__fileName__;

  const type = refType.replace('Definition', '');
  const name = path.parse(refName).name;

  return `${type}_${name}.stl.json`;
}
