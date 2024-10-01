import { D4Dependencies, D4PlayerTitle, getTextFromStl, resolveStringsList } from '../d4.js';
import { D4DadItem, D4DadTranslation, PLAYER_TITLE_PREFIX, PLAYER_TITLE_SUFFIX } from '../json/index.js';

export function playerTitleToDad(deps: D4Dependencies): (item: D4PlayerTitle) => [D4DadItem, D4DadTranslation] {
  return (title: D4PlayerTitle): [D4DadItem, D4DadTranslation] => {
    const playerTitleStringsList = resolveStringsList(title, deps.strings);

    const id = title.__snoID__;
    const filename = title.__fileName__;
    const typeId = title.__fileName__.includes('prefix') ? PLAYER_TITLE_PREFIX : PLAYER_TITLE_SUFFIX;
    const name = getTextFromStl(playerTitleStringsList, 'Name');
    const iconId = 2613320257; // placeholder, not the proper battle pass icon

    return [
      {
        id,
        filename,
        itemType: typeId,
        icon: iconId,
      },
      {
        name,
      },
    ];
  };
}
