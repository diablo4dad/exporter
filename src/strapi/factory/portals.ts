import {ItemReq,} from "../common.js";
import {
    CLASS_TYPES,
    D4Dependencies,
    D4StoreProduct,
    D4TownPortalCosmetic,
    getTextFromStl,
    resolveStoreProduct,
    resolveStringsList
} from "../../d4.js";

export function portalFactory(deps: D4Dependencies, media: Map<string, number>): (portal: D4TownPortalCosmetic) => ItemReq {
    function chooseIcon(portal: D4TownPortalCosmetic, storeProduct?: D4StoreProduct): number {
        if (storeProduct?.hStoreIconOverride) {
            return storeProduct.hStoreIconOverride;
        } else {
            return portal.hIconImage;
        }
    }

    function patchPortal(portal: D4TownPortalCosmetic): D4TownPortalCosmetic {
        // "Runic Threshold" has _01 appended to the store product definition
        // applies a workaround to resolve the strings list
        if (portal.__snoID__ === 1797816) {
            const fixedFileName =  portal.__fileName__.replace('_01', '');
            return {
                ...portal,
                __fileName__: fixedFileName,
            };
        }

        return portal;
    }

    return (portal: D4TownPortalCosmetic): ItemReq => {
        portal = patchPortal(portal);

        const storeProduct = resolveStoreProduct(portal, deps.storeProducts);
        const stringsList = resolveStringsList(storeProduct, deps.strings);

        const itemId = portal.__snoID__;
        const itemType = "Town Portal";
        const magicType = "Common";
        const transMog = false;
        const name = getTextFromStl(stringsList, "Name");
        const description = getTextFromStl(stringsList, "Description");
        const series = getTextFromStl(stringsList, 'Series');
        const iconId = chooseIcon(portal, storeProduct);
        const icon = iconId ? (media.get(iconId + '.webp') ?? null) : null;
        const usableByClass = CLASS_TYPES;
        const transmogName = "";

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
            series,
            transmogName,
        }
    }
}
