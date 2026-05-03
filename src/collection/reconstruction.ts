import {
  BACK_TROPHY,
  BODY_MARKING,
  BOW,
  EMBLEM,
  FLAIL,
  HEADSTONE,
  HORSE_ARMOR,
  MACE,
  QUARTERSTAFF,
  SHIELD,
  SWORD,
  TOWN_PORTAL,
  TROPHY,
  TWO_HANDED_CROSSBOW,
  TWO_HANDED_MACE,
  TWO_HANDED_POLEARM,
  TWO_HANDED_STAFF,
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

// doom
export const SLAYERS_FLAIL = 2414192;
export const DREADMACE = 2414209;
export const SHIELD_SAW = 2414286;
export const CHAINSHOT_STAFF = 2414302;
export const PULVERIZER = 2414328;
export const BALLISTIC_FORCE_CROSSBOW = 2414353;
export const IMPALER = 2414374;
export const HEAD_OF_THE_CYBERDEMON = 2414172;
export const THE_FORSAKEN_GATES = 9999004;
export const FONT_OF_THE_SLAYER = 9999005;

const DOOM: [D4DadItem, D4DadTranslation][] = [
  [
    {
      id: SLAYERS_FLAIL,
      itemType: FLAIL,
      filename: 'Item/Flail_stor008.itm',
      icon: 119768999,
    },
    {
      name: "Slayer's Flail",
    },
  ],
  [
    {
      id: DREADMACE,
      itemType: MACE,
      filename: 'Item/mace_stor067.itm',
      icon: 1014222522,
    },
    {
      name: 'Dreadmace',
    },
  ],
  [
    {
      id: SHIELD_SAW,
      itemType: SHIELD,
      filename: 'Item/shield_stor049.itm',
      icon: 443651805,
    },
    {
      name: 'Shield Saw',
    },
  ],
  [
    {
      id: CHAINSHOT_STAFF,
      itemType: TWO_HANDED_STAFF,
      filename: 'Item/twoHandSorcStaff_stor060.itm',
      icon: 121881341,
    },
    {
      name: 'Chainshot Staff',
    },
  ],
  [
    {
      id: PULVERIZER,
      itemType: TWO_HANDED_MACE,
      filename: 'Item/twoHandMace_stor059.itm',
      icon: 1568475824,
    },
    {
      name: 'Pulverizer',
    },
  ],
  [
    {
      id: BALLISTIC_FORCE_CROSSBOW,
      itemType: TWO_HANDED_CROSSBOW,
      filename: 'Item/twoHandCrossbow_stor063.itm',
      icon: 3429726759,
    },
    {
      name: 'Ballistic Force Crossbow',
    },
  ],
  [
    {
      id: IMPALER,
      itemType: QUARTERSTAFF,
      filename: 'Item/twoHandQuarterstaff_stor026.itm',
      icon: 1887841932,
    },
    {
      name: 'Impaler',
    },
  ],
  [
    {
      id: HEAD_OF_THE_CYBERDEMON,
      itemType: BACK_TROPHY,
      filename: 'Item/trophy_glo007_stor.itm',
      icon: 3807014373,
    },
    {
      name: 'Head of the Cyberdemon',
    },
  ],
  [
    {
      id: THE_FORSAKEN_GATES,
      itemType: TOWN_PORTAL,
      filename: '',
      icon: -1,
    },
    {
      name: 'The Forsaken Gates',
    },
  ],
  [
    {
      id: FONT_OF_THE_SLAYER,
      itemType: HEADSTONE,
      filename: '',
      icon: -1,
    },
    {
      name: 'Font of the Slayer',
    },
  ],
];

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
  return [SECONDARY_ANNIVERSARY, BERSERK, DOOM].flat();
}
