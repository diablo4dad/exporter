import {D4Dependencies, StrapiItemReq,} from "./common.js";
import {CLASS_TYPES, D4TownPortalCosmetic, getTextFromStl, resolveStoreProduct, resolveStringsList} from "../d4.js";

export function portalFactory(deps: D4Dependencies, media: Map<string, number>): (portal: D4TownPortalCosmetic) => StrapiItemReq {
    return (portal: D4TownPortalCosmetic): StrapiItemReq => {
        const storeProduct = resolveStoreProduct(portal, deps.storeProducts);
        const stringsList = resolveStringsList(storeProduct, deps.strings);

        const itemId = portal.__snoID__;
        const itemType = "Town Portal";
        const magicType = "Common";
        const transMog = false;
        const name = getTextFromStl(stringsList, "Name");
        const description = getTextFromStl(stringsList, "Description");
        const iconId = storeProduct?.hStoreIconOverride ?? portal.hIconImage;
        const icon = iconId ? (media.get(iconId + '.webp') ?? null) : null;
        const usableByClass = CLASS_TYPES;

        return {
            itemType,
            itemId,
            name,
            description,
            iconId,
            icon,
            usableByClass,
            transMog,
            magicType,
        }
    }
}
