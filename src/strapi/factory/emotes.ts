import {
    CLASS_TYPES,
    D4Emote,
    D4StoreProduct,
    getTextFromStl,
    resolveSno,
    resolveStoreProduct,
    resolveStringsList
} from "../../d4.js";
import {D4Dependencies, ItemReq,} from "../common.js";

export function emoteFactory(deps: D4Dependencies, media: Map<string, number>): (item: D4Emote) => ItemReq {
    function chooseIcon(emote: D4Emote, storeProduct?: D4StoreProduct): number {
        if (storeProduct?.hStoreIconOverride) {
            return storeProduct.hStoreIconOverride;
        } else {
            return emote.hImageNormal;
        }
    }

    return (emote: D4Emote): ItemReq => {
        const emoteStringsList = resolveStringsList(emote, deps.strings);
        const powerSno = resolveSno(emote.snoPower, deps.powers);
        const storeProduct = resolveStoreProduct(emote, deps.storeProducts);
        const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

        const itemId = emote.__snoID__;
        const itemType = "Emote";
        const name = getTextFromStl(emoteStringsList, "Name");
        const description = getTextFromStl(emoteStringsList, "Description");
        const series = getTextFromStl(storeProductStringsList, 'Series');
        const iconId = chooseIcon(emote, storeProduct);
        const icon = media.get(iconId + '.webp') ?? null;
        const transMog = false;
        const magicType = "Common";
        const transmogName = '';
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
            series,
            transmogName,
        }
    }
}
