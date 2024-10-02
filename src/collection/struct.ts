import { Category } from './constants.js';

import {
  D4Actor,
  D4Emblem,
  D4Emote,
  D4Item,
  D4MarkingShape,
  D4PlayerTitle,
  D4StoreProduct,
  D4TownPortalCosmetic,
} from '../d4data/struct.js';

export type CollectionDescriptor = {
  name?: string;
  category?: Category;
  description?: string;
  season?: number;
  outOfRotation?: boolean;
  premium?: boolean;
  claim?: string;
  claimDescription?: string;
  children?: CollectionDescriptor[];
  postHook?: (collection: D4DadCollection) => D4DadCollection;
  patches?: Partial<D4DadCollectionItem>[];
  challengeFile?: string;
  challengeFileFlatten?: boolean;
  reputationFile?: string;
  storeProducts?: string[];
  achievements?: string[];
  items?: string[][];
};

export type D4DadAchievement = D4DadEntity & {
  rewards?: D4DadAchievementRewards;
};

export type D4DadAchievementRewards = {
  items?: number[];
  products?: number[];
};

export type D4DadChallenge = D4DadEntity & {
  categories: D4DadChallengeCategory[];
};

export type D4DadChallengeCategory = {
  name?: string; // move to translations somehow
  categoryId: number;
  categories?: D4DadChallengeCategory[];
  achievements?: number[];
};

export type D4DadCollection = {
  id: number;
  itemId?: number;
  name: string;
  season?: number;
  outOfRotation?: boolean;
  premium?: boolean;
  description?: string;
  category?: string;
  bundleId?: number;
  subcollections: D4DadCollection[];
  collectionItems: D4DadCollectionItem[];
};

export type D4DadCollectionItem = {
  id: number;
  name: string; // debug only

  claim: string;
  claimDescription?: string;
  claimZone?: string;
  claimMonster?: string;

  outOfRotation?: boolean;
  premium?: boolean;
  promotional?: boolean;
  season?: number;
  unobtainable?: boolean;

  items: number[];
};

export type D4DadDb = {
  itemTypes: D4DadItemType[];
  items: D4DadItem[];
  products: D4DadStoreProduct[];
  collections: D4DadCollection[];
  achievements: D4DadAchievement[];
  challenges: D4DadChallenge[];
};

export type D4DadEntity = {
  id: number;
  filename?: string;
};

export type D4DadGenderSpecificImages = [number, number];
export type D4DadItem = D4DadEntity & {
  itemType: number;
  icon: number;
  usableByClass?: number[];
  invImages?: D4DadGenderSpecificImages[];
  magicType?: number;
  isTransmog?: boolean;
};

export type D4DadItemType = D4DadEntity & {
  // nothing
};

export type D4DadStoreProduct = D4DadEntity & {
  item?: number;
  bundledProducts?: number[];
};

export type D4DadTranslation = {
  name?: string;
  description?: string;
  series?: string;
  transmogName?: string;
};

export type D4DadTranslations = Record<number, D4DadTranslation>;
export type ItemList = {
  titles: D4PlayerTitle[];
  emblems: D4Emblem[];
  items: D4Item[];
  bundles: D4StoreProduct[];
  emotes: D4Emote[];
  headstones: D4Actor[];
  portals: D4TownPortalCosmetic[];
  markings: D4MarkingShape[];
};
