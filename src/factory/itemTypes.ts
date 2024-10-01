import { D4Dependencies, D4ItemType, getTextFromStl, resolveStringsList } from '../d4.js';
import { D4DadItemType, D4DadTranslation } from '../json/index.js';

export function itemTypeToDad(deps: D4Dependencies): (_: D4ItemType) => [D4DadItemType, D4DadTranslation] {
  return (itemType: D4ItemType): [D4DadItemType, D4DadTranslation] => {
    const itemTypeStringsList = resolveStringsList(itemType, deps.strings);

    const id = itemType.__snoID__;
    const filename = itemType.__fileName__;
    const name = getTextFromStl(itemTypeStringsList, 'Name');

    return [
      {
        id,
        filename,
      },
      {
        name,
      },
    ];
  };
}
