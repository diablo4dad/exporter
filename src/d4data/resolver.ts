import { EMPTY_STRINGS_LIST, FILE_EXTENSIONS, PATH_TO_D4STRING_LIST } from './constant.js';
import Path from 'path';
import { D4Ref, D4SnoRef, D4StoreProduct, D4Translation, D4Type } from './struct.js';

export function resolveSno<T>(ref: D4SnoRef | null, lookup: Map<string, T>): T | undefined {
  if (ref === null) {
    return;
  }

  // normalise filename
  const targetFileName = Path.join('json', ref.__targetFileName__ + '.json').replace('/', '\\');

  return lookup.get(targetFileName);
}

export function resolveStoreProduct(
  ref: D4Ref & D4Type,
  lookup: Map<string, D4StoreProduct>,
): D4StoreProduct | undefined {
  const ext = FILE_EXTENSIONS.get(ref.__type__);
  if (!ext) {
    return;
  }

  const type = ref.__type__.replace('Definition', '');
  const targetFileName = ref.__fileName__.replace(type, 'StoreProduct').replace(ext, '.prd');
  const targetFileNameKey = Path.join('json', targetFileName + '.json').replace('/', '\\');

  return lookup.get(targetFileNameKey);
}

export function resolveStringsList(
  ref: (D4Ref & D4Type) | undefined,
  lookup: Map<string, D4Translation>,
): D4Translation {
  if (!ref) {
    return EMPTY_STRINGS_LIST;
  }

  const filename = inferStl(ref);
  const relativeFilename = Path.join(PATH_TO_D4STRING_LIST, filename);
  const stringsList = lookup.get(relativeFilename);
  return stringsList ?? EMPTY_STRINGS_LIST;
}

function inferStl(ref: D4Ref & D4Type): string {
  const type = ref.__type__;
  const fileName = ref.__fileName__;

  const slicedType = type.replace('Definition', '');
  const baseFileName = Path.parse(fileName).name;

  return `${slicedType}_${baseFileName}.stl.json`;
}
