import {
  BACK_TROPHY,
  BODY_MARKING,
  BOW,
  EMBLEM,
  HEADSTONE,
  HORSE_ARMOR,
  SWORD,
  TROPHY,
  TWO_HANDED_POLEARM,
  TWO_HANDED_SWORD,
} from './constants.js';
import { D4DadItem, D4DadTranslation } from './struct.js';

// second anniversary
export const SUNFLAME_LANTERN = 1827953;
export const BURNING_DAWN_BANNER = 1827970;
export const SUNRAISER = 2197548;
export const SUNFLAME_SWORD = 1827947;
export const BURNING_BARDS = 2197580;
export const BURNING_DAWN_BOW = 2198770;
export const THE_BURNING_DAWN = 1827923;

// berserk
export const THE_HAWKS_DESTINY = 2130900;
export const THE_SKULL_KNIGHTS_HERALDRY = 2099177;
export const BRAND_OF_SACRIFICE = 9999001;
export const THE_FORETOLD_ECLIPSE = 9999002;
export const ODE_OF_THE_BERSERKER = 9999003;

const BERSERK: [D4DadItem, D4DadTranslation][] = [
  [
    {
      id: THE_HAWKS_DESTINY,
      itemType: BACK_TROPHY,
      filename: 'Item/trophy_glo005_stor.itm',
      icon: 3728743587,
    },
    {
      name: "The Hawk's Destiny",
    },
  ],
  [
    {
      id: THE_SKULL_KNIGHTS_HERALDRY,
      itemType: TROPHY,
      filename: 'Item/mnt_stor268_trophy.itm',
      icon: 2094159131,
    },
    {
      name: "The Skull Knight's Heraldry",
    },
  ],
  [
    {
      id: BRAND_OF_SACRIFICE,
      itemType: BODY_MARKING,
      filename: '',
      icon: -1,
    },
    {
      name: 'Brand of Sacrifice',
    },
  ],
  [
    {
      id: THE_FORETOLD_ECLIPSE,
      itemType: HEADSTONE,
      filename: '',
      icon: -1,
    },
    {
      name: 'The Foretold Eclipse',
    },
  ],
  [
    {
      id: ODE_OF_THE_BERSERKER,
      itemType: EMBLEM,
      filename: '',
      icon: -1,
    },
    {
      name: 'Od of the Berserker',
    },
  ],
];

const SECONDARY_ANNIVERSARY: [D4DadItem, D4DadTranslation][] = [
  [
    {
      id: SUNFLAME_LANTERN,
      itemType: TROPHY,
      filename: 'Item/mnt_stor212_trophy.itm',
      icon: 2899911376,
    },
    {
      name: 'Sunflame Lantern',
    },
  ],
  [
    {
      id: BURNING_DAWN_BANNER,
      itemType: TROPHY,
      filename: 'Item/mnt_stor213_trophy.itm',
      icon: 2568681393,
    },
    {
      name: 'Burning Dawn Banner',
    },
  ],
  [
    {
      id: SUNRAISER,
      itemType: SWORD,
      filename: 'Item/sword_stor107.itm',
      icon: 3772429934,
    },
    {
      name: 'Sunraiser',
    },
  ],
  [
    {
      id: SUNFLAME_SWORD,
      itemType: TWO_HANDED_SWORD,
      filename: 'Item/twoHandSword_stor031.itm',
      icon: 587952447,
    },
    {
      name: 'Sunflame Sword',
    },
  ],
  [
    {
      id: BURNING_BARDS,
      itemType: TWO_HANDED_POLEARM,
      filename: 'Item/twoHandPolearm_stor072.itm',
      icon: 3269931109,
    },
    {
      name: 'Burning Barbs',
    },
  ],
  [
    {
      id: BURNING_DAWN_BOW,
      itemType: BOW,
      filename: 'Item/twoHandBow_stor039.itm',
      icon: 2844266080,
    },
    {
      name: 'Burning Dawn Bow',
    },
  ],
  [
    {
      id: THE_BURNING_DAWN,
      itemType: HORSE_ARMOR,
      filename: 'Item/mnt_amor203_horse_stor.itm',
      icon: 478802809,
    },
    {
      name: 'The Burning Dawn',
    },
  ],
];

export function getReconstructedEntities(): [D4DadItem, D4DadTranslation][] {
  return [SECONDARY_ANNIVERSARY, BERSERK].flat();
}
