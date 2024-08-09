import {
  D4Actor,
  D4Dependencies,
  D4Emblem,
  D4Emote,
  D4Item,
  D4MarkingShape,
  D4PlayerTitle,
  D4Ref,
  D4StoreProduct,
  D4TownPortalCosmetic,
  D4Type,
  getTextFromStl,
  isActor,
  isEmblem,
  isEmote,
  isItem,
  isMarking,
  isPortal,
  isStoreProduct,
  isTitle,
  resolveSno,
  resolveStoreProduct,
  resolveStringsList
} from "../d4.js";
import {extractItemFromProduct} from "../strapi/factory/bundles.js";

export const BODY_MARKING = 7200;
export const EMOTE = 7201;
export const TOWN_PORTAL = 7202;
export const HEADSTONE = 7203;
export const EMBLEM = 7204;
export const PLAYER_TITLE_PREFIX = 7205;
export const PLAYER_TITLE_SUFFIX = 7206;

export const ITEM_TYPE_APPENDAGE: [D4DadItemType, D4DadTranslation][] = [
  [{id: 7200}, {name: "Body Marking"}],
  [{id: 7201}, {name: "Emote"}],
  [{id: 7202}, {name: "Town Portal"}],
  [{id: 7203}, {name: "Headstone"}],
  [{id: 7204}, {name: "Emblem"}],
  [{id: 7205}, {name: "Player Title (Prefix)"}],
  [{id: 7206}, {name: "Player Title (Suffix)"}],
]

export type D4DadEntity = {
  id: number,
  filename?: string,
}

export type D4DadTranslation = {
  name?: string,
  description?: string,
  series?: string,
  transmogName?: string,
}

export type D4DadCollection = {
  id: number,
  name: string,
  season?: number,
  outOfRotation?: boolean,
  description?: string,
  category?: string,
  bundleId?: number,
  subcollections: D4DadCollection[],
  collectionItems: D4DadCollectionItem[],
}

export type D4DadCollectionItem = {
  id: number,
  name: string, // debug only

  claim: string,
  claimDescription?: string,
  claimZone?: string,
  claimMonster?: string,

  outOfRotation?: boolean,
  premium?: boolean,
  promotional?: boolean,
  season?: number,
  unobtainable?: boolean,

  items: number[],
}

export enum D4DadCollectionCategory {
  GENERAL = "general",
  SEASONS = "seasons",
  CHALLENGES = "challenges",
  PROMOTIONAL = "promotional",
  STORE = "store",
}

export type D4DadDb = {
  itemTypes: D4DadItemType[],
  items: D4DadItem[],
  products: D4DadStoreProduct[],
  collections: D4DadCollection[],
  achievements: D4DadAchievement[],
  challenges: D4DadChallenge[],
}

export type D4DadStoreProduct = D4DadEntity & {
  item?: number,
  bundledProducts?: number[],
}

export type D4DadChallenge = D4DadEntity & {
  categories: D4DadChallengeCategory[],
}

export type D4DadChallengeCategory = {
  name?: string,  // move to translations somehow
  categoryId: number,
  categories?: D4DadChallengeCategory[],
  achievements?: number[],
}

export type D4DadAchievement = D4DadEntity & {
  rewards?: D4DadAchievementRewards,
}

export type D4DadAchievementRewards = {
  items?: number[],
  products?: number[],
}

export type D4DadTranslations = Record<number, D4DadTranslation>;
export type D4DadGenderSpecificImages = [number, number];

export type D4DadItem = D4DadEntity & {
  itemType: number,
  icon: number,
  usableByClass?: number[],
  invImages?: D4DadGenderSpecificImages[],
  magicType?: number,
  isTransmog?: boolean,
}

export type D4DadItemType = D4DadEntity & {
  // nothing
}


export type ItemList = {
  titles: D4PlayerTitle[],
  emblems: D4Emblem[],
  items: D4Item[],
  bundles: D4StoreProduct[],
  emotes: D4Emote[],
  headstones: D4Actor[],
  portals: D4TownPortalCosmetic[],
  markings: D4MarkingShape[],
}

export function unpackStoreProduct(deps: D4Dependencies): (product: D4StoreProduct) => ItemList {
  return (product: D4StoreProduct): ItemList => {
    let itemList = createItemList();

    itemList = pushToItemList(itemList, extractItemFromProduct(deps)(product));

    product.arBundledProducts.forEach(bp => {
      const innerProduct = resolveSno(bp, deps.storeProducts);
      if (innerProduct) {
        itemList = pushToItemList(itemList, extractItemFromProduct(deps)(innerProduct));
      }
    });

    return itemList;
  }
}

export function filterItemList(itemlist: ItemList): ItemList {
  const filterThese = [
    "SJCache",
  ];

  return ({
    ...itemlist,
    items: itemlist.items.filter(i => !filterThese.includes(i.snoItemType?.name ?? "")),
  });
}

export function createItemList(): ItemList {
  return {
    titles: [],
    emblems: [],
    items: [],
    bundles: [],
    emotes: [],
    headstones: [],
    portals: [],
    markings: [],
  };
}

export function mergeItemLists(a: ItemList, b: ItemList): ItemList {
  return {
    titles: [...a.titles, ...b.titles],
    emblems: [...a.emblems, ...b.emblems],
    items: [...a.items, ...b.items],
    bundles: [...a.bundles, ...b.bundles],
    emotes: [...a.emotes, ...b.emotes],
    headstones: [...a.headstones, ...b.headstones],
    portals: [...a.portals, ...b.portals],
    markings: [...a.markings, ...b.markings],
  };
}

// ack!
export const generateId = (() => {
  let num = 15000;

  return () => {
    return num += 1;
  };
})();

export function pushToItemList(itemList: ItemList, item?: D4Type): ItemList {
  if (item === undefined) {
    return itemList;
  }

  if (isTitle(item)) {
    return {
      ...itemList,
      titles: [...itemList.titles, item],
    }
  }

  if (isEmblem(item)) {
    return {
      ...itemList,
      emblems: [...itemList.emblems, item],
    }
  }

  if (isItem(item)) {
    return {
      ...itemList,
      items: [...itemList.items, item],
    }
  }

  if (isStoreProduct(item)) {
    return {
      ...itemList,
      bundles: [...itemList.bundles, item],
    }
  }

  if (isEmote(item)) {
    return {
      ...itemList,
      emotes: [...itemList.emotes, item],
    }
  }

  // headstones
  if (isActor(item)) {
    return {
      ...itemList,
      headstones: [...itemList.headstones, item],
    }
  }

  if (isPortal(item)) {
    return {
      ...itemList,
      portals: [...itemList.portals, item],
    }
  }

  if (isMarking(item)) {
    return {
      ...itemList,
      markings: [...itemList.markings, item],
    }
  }

  return itemList;
}

function shouldItemsBeAggregated(items: D4Item[]): boolean {
  if (items.length > 1) {
    const itemType = items[0].snoItemType?.__raw__;
    if (itemType) {
      return items.every(i => i.snoItemType?.__raw__ === itemType);
    }
  }

  return false;
}

export function composeName(deps: D4Dependencies) {
  return (...items: (D4Ref & D4Type)[]): string => {
    return items
      .map(i => {
        const itemStrings = resolveStringsList(i, deps.strings);

        const storeProduct = resolveStoreProduct(i, deps.storeProducts);
        const storeStrings = resolveStringsList(storeProduct, deps.strings);

        return getTextFromStl(itemStrings, "Name", getTextFromStl(storeStrings, "Name"));
      })
      .filter((v, i, self) => {
        return i == self.indexOf(v);
      })
      .join(", ");
  }
}

export function aggregateItemList(deps: D4Dependencies) {
  return (il: ItemList): (D4Ref & D4Type)[][] => {
    const collectionItems = [];

    if (il.items.length) {
      if (shouldItemsBeAggregated(il.items)) {
        collectionItems.push(il.items);
      } else {
        collectionItems.push(...il.items.map(i => [i]));
      }
    }

    if (il.titles.length) {
      collectionItems.push(il.titles);
    }

    if (il.emotes.length) {
      collectionItems.push(il.emotes);
    }

    if (il.markings.length) {
      collectionItems.push(il.markings);
    }

    if (il.emblems.length) {
      collectionItems.push(...il.emblems.map(i => [i]));
    }

    if (il.headstones.length) {
      collectionItems.push(...il.headstones.map(i => [i]));
    }

    if (il.portals.length) {
      collectionItems.push(...il.portals.map(i => [i]));
    }

    if (il.bundles.length) {
      const bundleItems = il
        .bundles
        .map(unpackStoreProduct(deps))
        .reduce(mergeItemLists, createItemList());

      return [
        ...collectionItems,
        ...aggregateItemList(deps)(bundleItems),
      ];
    }

    return collectionItems;
  }
}