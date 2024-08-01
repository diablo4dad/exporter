import {
    D4Actor,
    D4Dependencies,
    D4StoreProduct,
    getTextFromStl,
    resolveStoreProduct,
    resolveStringsList
} from "../../d4.js";
import {D4DadItem, D4DadTranslation, HEADSTONE} from "../index.js";

function chooseIcon(headstone: D4Actor, storeProduct?: D4StoreProduct): number {
    if (storeProduct?.hStoreIconOverride) {
        return storeProduct.hStoreIconOverride;
    } else {
        return headstone.ptUIData[0]?.hPortraitImage ?? 0;
    }
}

export function headstoneToDad(deps: D4Dependencies): (headstone: D4Actor) => [D4DadItem, D4DadTranslation] {
    return (headstone: D4Actor): [D4DadItem, D4DadTranslation] => {
        const stringsList = resolveStringsList(headstone, deps.strings);
        const storeProduct = resolveStoreProduct(headstone, deps.storeProducts);
        const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

        const id = headstone.__snoID__;
        const filename = headstone.__fileName__;
        const typeId = HEADSTONE;
        const name = getTextFromStl(stringsList, "Name");
        const description = getTextFromStl(stringsList, "Description");
        const series = getTextFromStl(storeProductStringsList, 'Series');
        const iconId = chooseIcon(headstone, storeProduct);

        return [{
            id,
            filename,
            iconId,
            typeId,
        }, {
            name,
            description,
            series,
        }];
    }
}
