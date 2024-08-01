import {
    CLASS_TYPES,
    D4Dependencies,
    D4Emblem,
    D4StoreProduct,
    getTextFromStl,
    resolveStoreProduct,
    resolveStringsList
} from "../../d4.js";
import {ItemReq} from "../common.js";

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
        const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

        const itemId = emblem.__snoID__;
        const itemType = "Emblem";
        const name = getTextFromStl(emblemStringsList, "Name");
        const description = getTextFromStl(emblemStringsList, "Description");
        const series = getTextFromStl(storeProductStringsList, 'Series');
        const iconId = chooseIcon(emblem, storeProduct);
        const icon = media.get(iconId + '.webp') ?? null;
        const transMog = false;
        const magicType = "Common";
        const usableByClass = CLASS_TYPES;
        const transmogName = "";

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
