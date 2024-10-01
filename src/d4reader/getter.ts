import { D4Ref, D4Type } from '../d4data/struct.js';
import { D4Dependencies } from './struct.js';

export function getEntity<T>(key: string, lookup: Map<string, T>): T {
  const e = lookup.get(key);
  if (e === undefined) {
    throw new Error(key + ' not found.');
  }

  return e;
}

export function getEntityFuzzy(key: string, deps: D4Dependencies): D4Ref & D4Type {
  if (deps.items.has(key)) {
    return getEntity(key, deps.items);
  }

  if (deps.playerTitles.has(key)) {
    return getEntity(key, deps.playerTitles);
  }

  if (deps.emotes.has(key)) {
    return getEntity(key, deps.emotes);
  }

  if (deps.portals.has(key)) {
    return getEntity(key, deps.portals);
  }

  if (deps.emblems.has(key)) {
    return getEntity(key, deps.emblems);
  }

  if (deps.markings.has(key)) {
    return getEntity(key, deps.markings);
  }

  throw new Error(key + ' not found.');
}
