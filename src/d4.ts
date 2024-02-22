import Path from 'path'

type D4Type = {
    __type__: string,
    __typeHash__: string,
}

type D4Ref = {
    __fileName__: string,
    __snoID__: number,
}

type D4Item = D4Ref & D4Type & {
    snoActor?: D4SnoRef | D4Actor,
    snoItemType?: D4SnoRef | D4ItemType,
    tInvImages: D4InventoryImages[],
    unk_75d565b: number, // image
    eMagicType: number,
    fUsableByClass: number[],
    eDropMinWorldTier: number,
    bSeasonItem: boolean,
    nCustomDropWeight: number,
    bIsTransmog: boolean,
}

type D4InventoryImages = D4Type & {
    hDefaultImage: number,
    hFemaleImage: number,
}

type D4ItemType = D4Ref & D4Type & {
    fUseableByClass: number[],
}

type D4SnoRef = D4Type & {
    __raw__: number,
    __group__: number,
    __targetFileName__: string,
    groupName: string,
    name: string,
}

type D4Actor = D4Ref & D4Type & {
    ptItemData: D4ActorItemData[],
}

type D4ActorItemData = D4Type & {
    hDefaultImage: number,
}

type D4Texture = D4Ref & D4Type & {
    eTexFormat: number,
    dwWidth: number,
    dwHeight: number,
    ptFrame: D4TextureFrame[],
}

type D4TextureFrame = D4Type & {
    hImageHandle: number,
    flU0: number,
    flV0: number,
    flU1: number,
    flV1: number,
}

type D4Emote = D4Ref & D4Type & {
    hImageNormal: number,
    hImageHover: number,
    hImageDisabled: number,
}

type D4TownPortalCosmetic = D4Ref & D4Type & {
    hIconImage: number,
    eClassRestriction: number,
}

type D4MarkingShape = D4Ref & D4Type & {
    hIconImage: number,
    eClassRestriction: number,
}

type D4String = D4Type & {
    szLabel: string,
    szText: string,
    hLabel: string,
}

type D4Translation = D4Ref & D4Item & {
    arStrings: D4String[],
}

const MAGIC_TYPES = ["Common", "Legendary", "Unique"];
const CLASS_TYPES = ["Sorceress", "Druid", "Barbarian", "Rogue", "Necromancer"];

function getStlFileName(ref: D4Ref & D4Type): string {
    const type = ref.__type__;
    const fileName = ref.__fileName__;

    const slicedType = type.replace("Definition", "");
    const baseFileName = Path.parse(fileName).name;

    return `${slicedType}_${baseFileName}.stl.json`;
}

export {getStlFileName, MAGIC_TYPES, CLASS_TYPES};
export type {
    D4ItemType,
    D4Item,
    D4Type,
    D4TextureFrame,
    D4Texture,
    D4Translation,
    D4String,
    D4Actor,
    D4ActorItemData,
    D4Ref,
    D4SnoRef,
    D4InventoryImages,
    D4Emote,
    D4MarkingShape,
    D4TownPortalCosmetic,
};
