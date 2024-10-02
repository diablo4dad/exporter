import { resolveStoreProduct, resolveStringsList } from '../../d4data/resolver.js';
import { D4Actor, D4StoreProduct } from '../../d4data/struct.js';
import { getTextFromStl } from '../../d4reader/strings.js';
import { D4Dependencies } from '../../d4reader/struct.js';
import { stu } from '../../helper.js';
import { D4DadItem, D4DadTranslation, HEADSTONE } from '../index.js';

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
    const name = getTextFromStl(stringsList, 'Name');
    const description = stu(getTextFromStl(stringsList, 'Description'));
    const series = stu(getTextFromStl(storeProductStringsList, 'Series'));
    const iconId = chooseIcon(headstone, storeProduct);

    return [
      {
        id,
        filename,
        icon: iconId,
        itemType: typeId,
      },
      {
        name,
        description,
        series,
      },
    ];
  };
}
