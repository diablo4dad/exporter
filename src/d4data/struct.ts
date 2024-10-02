type D4Type = {
  __type__: string;
  __typeHash__: string;
};

type D4Ref = {
  __fileName__: string;
  __snoID__: number;
};

type D4Entity = D4Type & D4Ref;

type D4Item = D4Entity & {
  snoActor: D4SnoRef | null;
  snoItemType: D4SnoRef | null;
  snoMount: D4SnoRef | null;
  tInvImages: D4InventoryImages[];
  unk_75d565b: number; // image
  eMagicType: number;
  fUsableByClass: number[];
  eDropMinWorldTier: number;
  nDropMinLevel: number;
  nDropMaxLevel: number;
  nVendorDropMinLevel: number;
  nVendorDropMaxLevel: number;
  bSeasonItem: boolean;
  nCustomDropWeight: number;
  bIsTransmog: boolean;
  eDisplayedQualityLevel: number;
};

type D4InventoryImages = D4Type & {
  hDefaultImage: number;
  hFemaleImage: number;
};

type D4ItemType = D4Entity & {
  fUsableByClass: number[];
};

type D4SnoRef = D4Type & {
  __raw__: number;
  __group__: number;
  __targetFileName__: string;
  groupName: string;
  name: string;
};

type D4Actor = D4Entity & {
  ptItemData: D4ActorItemData[];
  ptUIData: D4ActorUIData[];
  eType: number;
};

type D4ActorItemData = D4Type & {
  hDefaultImage: number;
};

type D4ActorUIData = D4Type & {
  hPortraitImage: number;
};

type D4Texture = D4Entity & {
  eTexFormat: number;
  dwWidth: number;
  dwHeight: number;
  ptFrame: D4TextureFrame[];
};

type D4TextureFrame = D4Type & {
  hImageHandle: number;
  flU0: number;
  flV0: number;
  flU1: number;
  flV1: number;
};

type D4Power = D4Entity & {
  snoClassRequirement: D4SnoRef;
};

type D4Emblem = D4Entity & {
  hSmallIcon: number;
  hLargeIcon: number;
};

type D4Emote = D4Entity & {
  hImageNormal: number;
  hImageHover: number;
  hImageDisabled: number;
  snoPower: D4SnoRef;
};

type D4StoreProduct = D4Entity & {
  hStoreIconOverride: number;
  snoItemTransmog: D4SnoRef | null;
  snoMount: D4SnoRef | null;
  snoEmote: D4SnoRef | null;
  snoMarkingShape: D4SnoRef | null;
  snoJewelry: D4SnoRef | null;
  snoEmblem: D4SnoRef | null;
  snoHeadstone: D4SnoRef | null;
  snoTownPortal: D4SnoRef | null;
  arBundledProducts: D4SnoRef[];
  arAddOnBundles: D4SnoRef[];
};

type D4TownPortalCosmetic = D4Entity & {
  hIconImage: number;
  eClassRestriction: number;
};

type D4MarkingShape = D4Entity & {
  hIconImage: number;
  eClassRestriction: number;
};

type D4String = D4Type & {
  szLabel: string;
  szText: string;
  hLabel: string;
};

type D4Translation = D4Entity & {
  arStrings: D4String[];
};

type D4PlayerTitle = D4Entity & {
  bIsSeasonal: boolean;
};

type D4ChallengeDefinition = D4Entity & {
  arCategories: D4ChallengeCategory[];
};

type D4ChallengeCategory = D4Type & {
  dwID: number;
  arCategories: D4ChallengeCategory[];
  arAchievementSnos: D4SnoRef[];
};

type D4Achievement = D4Entity & {
  arRewardList: D4RewardDefinition[];
  tBattlePassTrack: number;
};

type D4Reputation = D4Entity;

type D4RewardDefinition = D4Type & {
  snoItem: D4SnoRef | null;
  snoPlayerTitle: D4SnoRef | null;
  snoStoreProduct: D4SnoRef | null;
  snoTrackedReward: D4SnoRef | null;
  snoEmblem: D4SnoRef | null;
};

export type {
  D4Achievement,
  D4Actor,
  D4ActorItemData,
  D4ChallengeCategory,
  D4ChallengeDefinition,
  D4Emblem,
  D4Emote,
  D4Entity,
  D4InventoryImages,
  D4Item,
  D4ItemType,
  D4MarkingShape,
  D4PlayerTitle,
  D4Power,
  D4Ref,
  D4Reputation,
  D4RewardDefinition,
  D4SnoRef,
  D4StoreProduct,
  D4String,
  D4Texture,
  D4TextureFrame,
  D4TownPortalCosmetic,
  D4Translation,
  D4Type,
};
