import Path from 'path'
import path from 'path'
import {PATH_TO_D4STRING_LIST} from "./config.js";

type D4Type = {
    __type__: string,
    __typeHash__: string,
}

type D4Ref = {
    __fileName__: string,
    __snoID__: number,
}

type D4Item = D4Ref & D4Type & {
    snoActor: D4SnoRef | null,
    snoItemType: D4SnoRef | null,
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
    ptUIData: D4ActorUIData[],
    eType: number,
}

type D4ActorItemData = D4Type & {
    hDefaultImage: number,
}

type D4ActorUIData = D4Type & {
    hPortraitImage: number,
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

type D4Power = D4Ref & D4Type & {
    snoClassRequirement: D4SnoRef,
}

type D4Emote = D4Ref & D4Type & {
    hImageNormal: number,
    hImageHover: number,
    hImageDisabled: number,
    snoPower: D4SnoRef,
}

type D4StoreProduct = D4Ref & D4Type & {
    hStoreIconOverride: number,
    snoItemTransmog: D4SnoRef | null,
    snoMount: D4SnoRef | null,
    snoEmote: D4SnoRef | null,
    snoMarkingShape: D4SnoRef | null,
    snoJewelry: D4SnoRef | null,
    snoEmblem: D4SnoRef | null,
    snoHeadstone: D4SnoRef | null,
    snoTownPortal: D4SnoRef | null,
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

type D4Translation = D4Ref & D4Type & {
    arStrings: D4String[],
}

const EMPTY_STRINGS_LIST: D4Translation = {
    arStrings: [],
    __snoID__: -1,
    __fileName__: 'missing',
    __type__: 'missing',
    __typeHash__: 'missing',
}

const MAGIC_TYPES = ["Common", "Legendary", "Unique"];
const CLASS_TYPES = ["Sorcerer", "Druid", "Barbarian", "Rogue", "Necromancer"];

function getStlFileName(ref: D4Ref & D4Type): string {
    const type = ref.__type__;
    const fileName = ref.__fileName__;

    const slicedType = type.replace("Definition", "");
    const baseFileName = Path.parse(fileName).name;

    return `${slicedType}_${baseFileName}.stl.json`;
}

function getTextFromStl(stl: D4Translation, label: string, fallback: string = ''): string {
    return stl.arStrings
        .filter(s => s.szLabel === label)
        .map(s => s.szText)
        .pop() ?? fallback;
}

const STORE_MAP = new Map([
    ['EmoteDefinition', ['Emote', '.emo']],
    ['ActorDefinition', ['Actor', '.acr']],
]);

function resolveStoreProduct(ref: D4Ref & D4Type, lookup: Map<string, D4StoreProduct>): D4StoreProduct | undefined {
    const mapping = STORE_MAP.get(ref.__type__);
    if (!mapping) {
        return;
    }

    const [type, ext] = mapping;
    const targetFileName = ref.__fileName__
        .replace(type, 'StoreProduct')
        .replace(ext, '.prd');
    const targetFileNameKey = path
        .join('json', targetFileName + '.json')
        .replace('/', '\\');

    return lookup.get(targetFileNameKey);
}

function resolveSno<T>(ref: D4SnoRef | null, lookup: Map<string, T>): T | undefined {
    if (ref === null) {
        return;
    }

    // normalise filename
    const targetFileName = path
        .join('json', ref.__targetFileName__ + '.json')
        .replace('/', '\\');

    return lookup.get(targetFileName);
}

function resolveStringsList(ref: D4Ref & D4Type | undefined, lookup: Map<string, D4Translation>): D4Translation {
    if (!ref) {
        return EMPTY_STRINGS_LIST;
    }

    const filename = getStlFileName(ref);
    const relativeFilename = path.join(PATH_TO_D4STRING_LIST, filename);
    const stringsList = lookup.get(relativeFilename);
    return stringsList ?? EMPTY_STRINGS_LIST;
}

function arrayToClassList(classes: number[]): string[] {
    return classes.map((v, i) => v === 0 ? false : CLASS_TYPES[i]).filter(c => c  !== false) as string[];
}

function toMagicType(magicType: number): string {
    return MAGIC_TYPES[magicType] ?? '';
}

function chooseBestIconHandle(item: D4Item, actor: D4Actor | undefined): number | null {
    // this seems to be the best icon when available
    if (item.unk_75d565b) {
        return item.unk_75d565b;
    }

    if (item.tInvImages) {
        if (item.tInvImages.length !== 5) {
            console.warn("Expecting tInvImages to contain 5 images.");
        } else {
            // default to male barbarian image if available
            if (item.tInvImages[2].hDefaultImage) {
                return item.tInvImages[2].hDefaultImage;
            }

            // otherwise, return any available variant
            for (const inventoryImage of item.tInvImages) {
                if (inventoryImage.hDefaultImage) {
                    return inventoryImage.hDefaultImage;
                }
            }
        }
    }

    if (actor) {
        for (const itemData of actor.ptItemData) {
            if (itemData.hDefaultImage) {
                return itemData.hDefaultImage;
            }
        }
    }

    return null;
}

export {getStlFileName, getTextFromStl, resolveSno, resolveStringsList, arrayToClassList, toMagicType, chooseBestIconHandle, CLASS_TYPES, resolveStoreProduct};
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
    D4Power,
    D4StoreProduct,
};
