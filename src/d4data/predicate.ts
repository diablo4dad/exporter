import {
  D4Actor,
  D4Emblem,
  D4Emote,
  D4Item,
  D4MarkingShape,
  D4PlayerTitle,
  D4StoreProduct,
  D4TownPortalCosmetic,
  D4Type,
} from './struct.js';

export function isActor(snoRef: D4Type): snoRef is D4Actor {
  return snoRef.__type__ === 'ActorDefinition';
}

export function isEmblem(snoRef: D4Type): snoRef is D4Emblem {
  return snoRef.__type__ === 'EmblemDefinition';
}

export function isEmote(snoRef: D4Type): snoRef is D4Emote {
  return snoRef.__type__ === 'EmoteDefinition';
}

export function isItem(snoRef: D4Type): snoRef is D4Item {
  return snoRef.__type__ === 'ItemDefinition';
}

export function isMarkingShape(snoRef: D4Type): snoRef is D4MarkingShape {
  return snoRef.__type__ === 'MarkingShapeDefinition';
}

export function isPlayerTitle(snoRef: D4Type): snoRef is D4PlayerTitle {
  return snoRef.__type__ === 'PlayerTitleDefinition';
}

export function isStoreProduct(snoRef: D4Type): snoRef is D4StoreProduct {
  return snoRef.__type__ === 'StoreProductDefinition';
}

export function isTownPortalCosmetic(snoRef: D4Type): snoRef is D4TownPortalCosmetic {
  return snoRef.__type__ === 'TownPortalCosmeticDefinition';
}
