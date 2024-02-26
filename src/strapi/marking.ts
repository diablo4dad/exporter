import {
    CLASS_TYPES,
    D4MarkingShape,
    D4StoreProduct,
    getTextFromStl,
    resolveStoreProduct,
    resolveStringsList
} from "../d4.js";
import {D4Dependencies, StrapiItemReq} from "./common.js";

export function markingShapeFactory(deps: D4Dependencies, media: Map<string, number>): (marking: D4MarkingShape) => StrapiItemReq {
    function chooseIcon(marking: D4MarkingShape, storeProduct?: D4StoreProduct): number {
        if (storeProduct?.hStoreIconOverride) {
            return storeProduct.hStoreIconOverride;
        } else {
            return marking.hIconImage;
        }
    }

    return (marking: D4MarkingShape): StrapiItemReq => {
        const markingStringsList = resolveStringsList(marking, deps.strings);
        const storeProduct = resolveStoreProduct(marking, deps.storeProducts);

        const itemId = marking.__snoID__;
        const itemType = "Body Marking";
        const name = getTextFromStl(markingStringsList, "Name");
        const description = getTextFromStl(markingStringsList, "Description");
        const iconId = chooseIcon(marking, storeProduct);
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
