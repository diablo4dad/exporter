import {
  D4Dependencies,
  D4StoreProduct,
  D4TownPortalCosmetic,
  getTextFromStl,
  resolveStoreProduct,
  resolveStringsList,
  stu
} from "../../d4.js";
import {D4DadItem, D4DadTranslation, TOWN_PORTAL} from "../index.js";

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

export function portalToDad(deps: D4Dependencies): (portal: D4TownPortalCosmetic) => [D4DadItem, D4DadTranslation] {
    return (portal: D4TownPortalCosmetic): [D4DadItem, D4DadTranslation] => {
        portal = patchPortal(portal);

        const storeProduct = resolveStoreProduct(portal, deps.storeProducts);
        const stringsList = resolveStringsList(storeProduct, deps.strings);

        const id = portal.__snoID__;
        const filename = portal.__fileName__;
        const typeId = TOWN_PORTAL;
        const name = getTextFromStl(stringsList, "Name");
        const description = stu(getTextFromStl(stringsList, "Description"));
        const series = stu(getTextFromStl(stringsList, 'Series'));
        const iconId = chooseIcon(portal, storeProduct);

        return [{
            id,
            filename,
            itemType: typeId,
            icon: iconId,
        }, {
            name,
            description,
            series,
        }];
    }
}
