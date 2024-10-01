import {
  chooseBestIconHandle,
  D4Dependencies,
  D4Item,
  getTextFromStl,
  resolveSno,
  resolveStoreProduct,
  resolveStringsList,
  stu,
} from '../d4.js';
import { D4DadGenderSpecificImages, D4DadItem, D4DadTranslation } from '../json/index.js';

export function itemToDad(deps: D4Dependencies): (_: D4Item) => [D4DadItem, D4DadTranslation] {
  return (item: D4Item): [D4DadItem, D4DadTranslation] => {
    // item strings
    const itemStringsList = resolveStringsList(item, deps.strings);

    // (optional) get item type + actor
    const itemActor = resolveSno(item.snoMount ?? item.snoActor, deps.actors);
    const itemActorStringsList = resolveStringsList(itemActor, deps.strings);
    const itemTypeSno = resolveSno(item.snoItemType, deps.itemTypes);
    const storeProduct = resolveStoreProduct(item, deps.storeProducts);
    const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

    // key vars
    const id = item.__snoID__;
    const filename = item.__fileName__;
    const typeId = itemTypeSno?.__snoID__ ?? -1;
    const name = getTextFromStl(itemActorStringsList, 'Name', getTextFromStl(itemStringsList, 'Name'));
    const description = stu(getTextFromStl(itemStringsList, 'Description'));
    const isTransmog = !item.bIsTransmog ? undefined : true;
    const usableByClass = item.fUsableByClass.every((i) => i === 1) ? undefined : item.fUsableByClass;
    const magicType = !item.eMagicType ? undefined : item.eMagicType;
    const iconId = chooseBestIconHandle(item, itemActor) ?? 0;
    const series = stu(getTextFromStl(storeProductStringsList, 'Series'));
    const transmogName = stu(getTextFromStl(itemStringsList, 'TransmogName'));
    const invImages: D4DadGenderSpecificImages[] | undefined = item.tInvImages.some(
      (ii) => ii.hDefaultImage !== 0 || ii.hFemaleImage !== 0,
    )
      ? item.tInvImages.map((ii) => [ii.hDefaultImage, ii.hFemaleImage])
      : undefined;

    return [
      {
        id,
        filename,
        itemType: typeId,
        icon: iconId,
        magicType,
        isTransmog,
        usableByClass,
        invImages,
      },
      {
        name,
        description,
        transmogName,
        series,
      },
    ];
  };
}
