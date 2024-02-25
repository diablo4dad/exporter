import {CLASS_TYPES, D4Emblem, getTextFromStl, resolveStoreProduct, resolveStringsList} from "../d4.js";
import {D4Dependencies, StrapiItemReq} from "./common.js";

export function emblemFactory(deps: D4Dependencies, media: Map<string, number>): (emblem: D4Emblem) => StrapiItemReq {
    return (emblem: D4Emblem): StrapiItemReq => {
        const emblemStringsList = resolveStringsList(emblem, deps.strings);
        const storeProduct = resolveStoreProduct(emblem, deps.storeProducts);

        const itemId = emblem.__snoID__;
        const itemType = "Emblem";
        const name = getTextFromStl(emblemStringsList, "Name");
        const description = getTextFromStl(emblemStringsList, "Description");
        const iconId = storeProduct?.hStoreIconOverride ?? emblem.hLargeIcon;
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
