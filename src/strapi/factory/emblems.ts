import {
    CLASS_TYPES,
    D4Emblem,
    D4StoreProduct,
    getTextFromStl,
    resolveStoreProduct,
    resolveStringsList
} from "../../d4.js";
import {D4Dependencies, ItemReq} from "../common.js";

export function emblemFactory(deps: D4Dependencies, media: Map<string, number>): (emblem: D4Emblem) => ItemReq {
    function chooseIcon(emblem: D4Emblem, storeProduct?: D4StoreProduct): number {
        if (storeProduct?.hStoreIconOverride) {
            return storeProduct.hStoreIconOverride;
        } else {
            return emblem.hSmallIcon;
        }
    }

    return (emblem: D4Emblem): ItemReq => {
        const emblemStringsList = resolveStringsList(emblem, deps.strings);
        const storeProduct = resolveStoreProduct(emblem, deps.storeProducts);

        const itemId = emblem.__snoID__;
        const itemType = "Emblem";
        const name = getTextFromStl(emblemStringsList, "Name");
        const description = getTextFromStl(emblemStringsList, "Description");
        const iconId = chooseIcon(emblem, storeProduct);
        const icon = media.get(iconId + '.webp') ?? null;
        const transMog = false;
        const magicType = "Common";
        const usableByClass = CLASS_TYPES;

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
