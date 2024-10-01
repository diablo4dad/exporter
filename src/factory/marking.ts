import { D4MarkingShape, D4StoreProduct } from '../d4data/struct.js';
import { BODY_MARKING, D4DadItem, D4DadTranslation } from '../json/index.js';
import { resolveStoreProduct, resolveStringsList } from '../d4data/resolver.js';
import { getTextFromStl } from '../d4reader/strings.js';
import { stu } from '../helper.js';
import { D4Dependencies } from '../d4reader/struct.js';

function chooseIcon(marking: D4MarkingShape, storeProduct?: D4StoreProduct): number {
  if (storeProduct?.hStoreIconOverride) {
    return storeProduct.hStoreIconOverride;
  } else {
    return marking.hIconImage;
  }
}

export function markingShapeToDad(deps: D4Dependencies): (marking: D4MarkingShape) => [D4DadItem, D4DadTranslation] {
  function bruteForceProductRef(marking: D4MarkingShape): D4StoreProduct | undefined {
    for (const product of deps.storeProducts.values()) {
      if (product.snoMarkingShape?.__raw__ === marking.__snoID__) {
        return product;
      }
    }
  }

  return (marking: D4MarkingShape): [D4DadItem, D4DadTranslation] => {
    const markingStringsList = resolveStringsList(marking, deps.strings);
    const storeProduct = resolveStoreProduct(marking, deps.storeProducts) ?? bruteForceProductRef(marking);
    const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

    const id = marking.__snoID__;
    const filename = marking.__fileName__;
    const typeId = BODY_MARKING;
    const name = getTextFromStl(markingStringsList, 'Name', getTextFromStl(storeProductStringsList, 'Name'));
    const description = stu(
      getTextFromStl(markingStringsList, 'Description', getTextFromStl(storeProductStringsList, 'Description')),
    );
    const series = stu(getTextFromStl(storeProductStringsList, 'Series'));
    const iconId = chooseIcon(marking, storeProduct);

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
