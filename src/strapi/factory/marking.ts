import {
    CLASS_TYPES,
    D4Dependencies,
    D4MarkingShape,
    D4StoreProduct,
    getTextFromStl,
    resolveStoreProduct,
    resolveStringsList
} from "../../d4.js";
import {ItemReq} from "../common.js";

export function markingShapeFactory(deps: D4Dependencies, media: Map<string, number>): (marking: D4MarkingShape) => ItemReq {
    function chooseIcon(marking: D4MarkingShape, storeProduct?: D4StoreProduct): number {
        if (storeProduct?.hStoreIconOverride) {
            return storeProduct.hStoreIconOverride;
        } else {
            return marking.hIconImage;
        }
    }

    function bruteForceProductRef(marking: D4MarkingShape): D4StoreProduct | undefined {
        for (const product of deps.storeProducts.values()) {
            if (product.snoMarkingShape?.__raw__ === marking.__snoID__) {
                return product;
            }
        }
    }

    return (marking: D4MarkingShape): ItemReq => {
        const markingStringsList = resolveStringsList(marking, deps.strings);
        const storeProduct = resolveStoreProduct(marking, deps.storeProducts) ?? bruteForceProductRef(marking);
        const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

        const itemId = marking.__snoID__;
        const itemType = "Body Marking";
        const name = getTextFromStl(markingStringsList, "Name", getTextFromStl(storeProductStringsList, "Name"));
        const description = getTextFromStl(markingStringsList, "Description", getTextFromStl(storeProductStringsList, "Description"));
        const series = getTextFromStl(storeProductStringsList, 'Series');
        const iconId = chooseIcon(marking, storeProduct);
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
