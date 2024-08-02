import {
  CLASS_TYPES,
  D4Dependencies,
  D4Emote,
  D4StoreProduct,
  getTextFromStl,
  resolveSno,
  resolveStoreProduct,
  resolveStringsList,
  stu
} from "../../d4.js";
import {D4DadItem, D4DadTranslation, EMOTE} from "../index.js";

function chooseIcon(emote: D4Emote, storeProduct?: D4StoreProduct): number {
    if (storeProduct?.hStoreIconOverride) {
        return storeProduct.hStoreIconOverride;
    } else {
        return emote.hImageNormal;
    }
}

export function emoteToDad(deps: D4Dependencies): (_: D4Emote) => [D4DadItem, D4DadTranslation] {
    return (emote: D4Emote): [D4DadItem, D4DadTranslation] => {
        const emoteStringsList = resolveStringsList(emote, deps.strings);
        const powerSno = resolveSno(emote.snoPower, deps.powers);
        const storeProduct = resolveStoreProduct(emote, deps.storeProducts);
        const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

        const id = emote.__snoID__;
        const filename = emote.__fileName__;
        const typeId = EMOTE;
        const name = getTextFromStl(emoteStringsList, "Name");
        const description = stu(getTextFromStl(emoteStringsList, "Description"));
        const series = stu(getTextFromStl(storeProductStringsList, 'Series'));
        const iconId = chooseIcon(emote, storeProduct);
        const usableByClass =
          powerSno?.snoClassRequirement?.name ?
            CLASS_TYPES.map(ct => ct === powerSno.snoClassRequirement.name ? 1 : 0) :
            undefined;

        return [{
            id,
            filename,
            itemType: typeId,
            icon: iconId,
            usableByClass,
        }, {
            name,
            description,
            series,
        }]
    }
}
