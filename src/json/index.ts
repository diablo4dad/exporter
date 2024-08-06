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
