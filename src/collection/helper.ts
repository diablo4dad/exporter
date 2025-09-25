import { D4DadCollection, D4DadCollectionItem } from './struct.js';

export function groupItemsWithSameName(c: D4DadCollection): D4DadCollection {
  return {
    ...c,
    subcollections: c.subcollections.map(groupItemsWithSameName),
    collectionItems: c.collectionItems.reduce((a, c) => {
      const existing = a.find((d) => d.name === c.name);
      if (existing) {
        existing.items.push(...c.items);
      } else {
        a.push(c);
      }
      return a;
    }, [] as D4DadCollectionItem[]),
  };
}
