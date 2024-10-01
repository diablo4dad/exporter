import { D4Emote, D4StoreProduct } from '../d4data/struct.js';
import { D4DadItem, D4DadTranslation, EMOTE } from '../json/index.js';
import { CLASS_TYPES } from '../d4data/constant.js';
import { resolveSno, resolveStoreProduct, resolveStringsList } from '../d4data/resolver.js';
import { getTextFromStl } from '../d4reader/strings.js';
import { stu } from '../helper.js';
import { D4Dependencies } from '../d4reader/struct.js';

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
    const name = getTextFromStl(emoteStringsList, 'Name');
    const description = stu(getTextFromStl(emoteStringsList, 'Description'));
    const series = stu(getTextFromStl(storeProductStringsList, 'Series'));
    const iconId = chooseIcon(emote, storeProduct);
    const usableByClass = powerSno?.snoClassRequirement?.name
      ? CLASS_TYPES.map((ct) => (ct === powerSno.snoClassRequirement.name ? 1 : 0))
      : undefined;

    return [
      {
        id,
        filename,
        itemType: typeId,
        icon: iconId,
        usableByClass,
      },
      {
        name,
        description,
        series,
      },
    ];
  };
}
