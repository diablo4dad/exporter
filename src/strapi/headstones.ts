import {D4Dependencies, StrapiItemReq,} from "./common.js";
import {CLASS_TYPES, D4Actor, D4StoreProduct, getTextFromStl, resolveStoreProduct, resolveStringsList} from "../d4.js";

export function headstoneFactory(deps: D4Dependencies, media: Map<string, number>): (headstone: D4Actor) => StrapiItemReq {
    function chooseIcon(headstone: D4Actor, storeProduct?: D4StoreProduct): number {
        if (storeProduct?.hStoreIconOverride) {
            return storeProduct.hStoreIconOverride;
        } else {
            return headstone.ptUIData[0]?.hPortraitImage ?? 0;
        }
    }

    return (headstone: D4Actor): StrapiItemReq => {
        const stringsList = resolveStringsList(headstone, deps.strings);
        const storeProduct = resolveStoreProduct(headstone, deps.storeProducts);

        const itemId = headstone.__snoID__;
        const name = getTextFromStl(stringsList, "Name");
        const description = getTextFromStl(stringsList, "Description");
        const iconId = chooseIcon(headstone, storeProduct);
        const icon = iconId ? (media.get(iconId + '.webp') ?? null) : null;
        const usableByClass = CLASS_TYPES;
        const itemType = "Headstone";
        const transMog = false;
        const magicType = "Common";

        return {
            itemId,
            name,
            description,
            iconId,
            icon,
            usableByClass,
            itemType,
            transMog,
            magicType,
        }
    }
}
