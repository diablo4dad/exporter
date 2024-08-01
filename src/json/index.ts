export const BODY_MARKING = 7200;
export const EMOTE = 7201;
export const TOWN_PORTAL = 7202;
export const HEADSTONE = 7203;
export const EMBLEM = 7204;
export const PLAYER_TITLE_PREFIX = 7205;
export const PLAYER_TITLE_SUFFIX = 7206;
export const PET = 7207;

export const ITEM_TYPE_APPENDAGE: [D4DadItemType, D4DadTranslation][] = [
  [{id: 7200}, {name: "Body Marking"}],
  [{id: 7201}, {name: "Emote"}],
  [{id: 7202}, {name: "Town Portal"}],
  [{id: 7203}, {name: "Headstone"}],
  [{id: 7204}, {name: "Emblem"}],
  [{id: 7205}, {name: "Player Title (Prefix)"}],
  [{id: 7206}, {name: "Player Title (Suffix)"}],
  [{id: 7207}, {name: "Pet"}],
]

export type D4DadEntity = {
  id: number,
  filename?: string,
}

export type D4DadTranslation = {
  name: string,
  description?: string,
  series?: string,
  transmogName?: string,
}

export type D4DadDb = {
  itemTypes: D4DadItemType[],
  items: D4DadItem[],
}

export type D4DadTranslations = Record<number, D4DadTranslation>;
export type D4DadGenderSpecificImages = [number, number];

export type D4DadItem = D4DadEntity & {
  typeId: number,
  iconId: number,
  usableByClass?: number[],
  invImages?: D4DadGenderSpecificImages[],
  magicType?: number,
  isTransmog?: boolean,
}

export type D4DadItemType = D4DadEntity & {
  // nothing
}
