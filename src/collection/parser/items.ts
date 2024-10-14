import { resolveSno, resolveStoreProduct, resolveStringsList } from '../../d4data/resolver.js';
import { D4Item } from '../../d4data/struct.js';
import { chooseBestIconHandle } from '../../d4reader/icons.js';
import { getTextFromStl } from '../../d4reader/strings.js';
import { D4Dependencies } from '../../d4reader/struct.js';
import { stu } from '../../helper.js';
import { D4DadGenderSpecificImages, D4DadItem, D4DadTranslation } from '../struct.js';

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
    const vohItem = !item.unk_5e84277 ? undefined : true;
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
        vohItem,
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
