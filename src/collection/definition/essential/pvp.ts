import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const ODDS_AND_ENDS: CollectionDescriptor = {
  name: 'Odds and Ends',
  description: 'Transmogs purchased using Red Dust',
  category: Category.PVP,
  claim: 'Vendor',
  claimDescription: 'Purchased from the Odds and Ends vendor.',
  items: [
    ['json\\base\\meta\\Item\\Helm_Cosmetic_Generic_075_pvpa.itm.json'],
    ['json\\base\\meta\\Item\\Chest_Cosmetic_Generic_075_pvpa.itm.json'],
    ['json\\base\\meta\\Item\\Gloves_Cosmetic_Generic_075_pvpa.itm.json'],
    ['json\\base\\meta\\Item\\Pants_Cosmetic_Generic_075_pvpa.itm.json'],
    ['json\\base\\meta\\Item\\Boots_Cosmetic_Generic_075_pvpa.itm.json'],
  ],
};

const UNCONVENTIONAL_MOUNT_ARMOR: CollectionDescriptor = {
  name: 'Unconventional Mount Armor',
  description: 'Transmogs purchased using Red Dust',
  category: Category.PVP,
  claim: 'Vendor',
  claimDescription: 'Purchased from the Unconventional Mount Armor vendor.',
  items: [
    ['json\\base\\meta\\Item\\mnt_uniq20_trophy_pvp.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq18_trophy_pvp.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq15_trophy_pvp.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor24_horse_pvp.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor23_horse_pvp.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor20_horse_pvp.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq51_trophy_pvp.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq52_trophy_pvp.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor51_horse_pvp.itm.json'],
    ['json\\base\\meta\\Item\\mnt_amor52_horse_pvp.itm.json'],
    ['json\\base\\meta\\Item\\MountReins_BloodyHorse.itm.json'],
  ],
};

const FIELDS_OF_HATRED: CollectionDescriptor = {
  name: 'Fields of Hatred',
  description: 'Transmogs looted from Baleful chests and killing players',
  category: Category.PVP,
  claim: 'Fields of Hatred',
  items: [
    ['json\\base\\meta\\Item\\mnt_uniq63_trophy.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq64_trophy.itm.json'],
  ],
  patches: [
    {
      items: [1048664],
      claimDescription: 'Drops from chests and players within Dry Steppes.',
    },
    {
      items: [1222169],
      claimDescription: 'Drops from chests and players within Kehjistan.',
    },
  ],
};

const PVP: CollectionDescriptor = {
  name: 'PvP',
  description: 'Transmogs earned within the Fields of Hatred',
  category: Category.GENERAL,
  children: [ODDS_AND_ENDS, UNCONVENTIONAL_MOUNT_ARMOR, FIELDS_OF_HATRED],
};

export default PVP;
