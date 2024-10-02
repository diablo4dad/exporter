import { resolveStringsList } from '../../d4data/resolver.js';
import { D4ItemType } from '../../d4data/struct.js';
import { getTextFromStl } from '../../d4reader/strings.js';
import { D4Dependencies } from '../../d4reader/struct.js';
import { D4DadItemType, D4DadTranslation } from '../struct.js';

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
