import { resolveStoreProduct, resolveStringsList } from '../../d4data/resolver.js';
import { D4Emblem, D4StoreProduct } from '../../d4data/struct.js';
import { getTextFromStl } from '../../d4reader/strings.js';
import { D4Dependencies } from '../../d4reader/struct.js';
import { stu } from '../../helper.js';
import { EMBLEM } from '../constants.js';
import { D4DadItem, D4DadTranslation } from '../struct.js';

function chooseIcon(emblem: D4Emblem, storeProduct?: D4StoreProduct): number {
  if (storeProduct?.hStoreIconOverride) {
    return storeProduct.hStoreIconOverride;
  } else {
    return emblem.hSmallIcon;
  }
}

export function emblemToDad(deps: D4Dependencies): (_: D4Emblem) => [D4DadItem, D4DadTranslation] {
  return (emblem: D4Emblem): [D4DadItem, D4DadTranslation] => {
    const emblemStringsList = resolveStringsList(emblem, deps.strings);
    const storeProduct = resolveStoreProduct(emblem, deps.storeProducts);
    const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

    const id = emblem.__snoID__;
    const filename = emblem.__fileName__;
    const typeId = EMBLEM;
    const name = getTextFromStl(emblemStringsList, 'Name');
    const description = stu(getTextFromStl(emblemStringsList, 'Description'));
    const series = stu(getTextFromStl(storeProductStringsList, 'Series'));
    const iconId = chooseIcon(emblem, storeProduct);

    return [
      {
        id,
        filename,
        itemType: typeId,
        icon: iconId,
      },
      {
        name,
        description,
        series,
      },
    ];
  };
}
