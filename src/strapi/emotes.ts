import {
    CLASS_TYPES,
    D4Emote,
    D4StoreProduct,
    getTextFromStl,
    resolveSno,
    resolveStoreProduct,
    resolveStringsList
} from "../d4.js";
import {D4Dependencies, StrapiItemReq,} from "./common.js";

function findBestEmoteIcon(emote: D4Emote, storeProduct?: D4StoreProduct): number {
    if (storeProduct?.hStoreIconOverride) {
        return storeProduct.hStoreIconOverride;
    }

    return emote.hImageNormal;
}

export function emoteFactory(deps: D4Dependencies, media: Map<string, number>): (item: D4Emote) => StrapiItemReq {
    return (emote: D4Emote): StrapiItemReq => {
        const emoteStringsList = resolveStringsList(emote, deps.strings);
        const powerSno = resolveSno(emote.snoPower, deps.powers);
        const storeProduct = resolveStoreProduct(emote, deps.storeProducts);

        const itemId = emote.__snoID__;
        const itemType = "Emote";
        const name = getTextFromStl(emoteStringsList, "Name");
        const description = getTextFromStl(emoteStringsList, "Description");
        const iconId = findBestEmoteIcon(emote, storeProduct);
        const icon = media.get(iconId + '.webp') ?? null;
        const transMog = false;
        const magicType = "Common";
        const usableByClass = powerSno
            ? powerSno.snoClassRequirement
                ? [powerSno.snoClassRequirement.name]
                : CLASS_TYPES
            : CLASS_TYPES;

        return {
            itemId,
            name,
            description,
            usableByClass,
            icon,
            iconId,
            itemType,
            transMog,
            magicType,
        }
    }
}
