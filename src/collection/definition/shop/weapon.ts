import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const WEAPONS: CollectionDescriptor = {
  name: 'Weapons',
  description: 'Weapon bundles',
  category: Category.SHOP_ITEMS,
  premium: true,
  children: [
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Weapons_bar_stor001.prd.json'],
    },
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Weapons_bar_stor002.prd.json'],
    },
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Weapons_nec_stor001.prd.json'],
    },
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Weapons_nec_stor002.prd.json'],
    },
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_MagmaticArmaments.prd.json'],
    },
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\AddOn_StarterPack2.prd.json'],
    },
    {
      // Arms of Sivalir
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Weapons_Any_stor003.prd.json'],
    },
    {
      // The Hydra's Forge
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Weapons_Any_stor002.prd.json'],
    },
    {
      // The Crystalline Armory
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Weapons_Any_stor001.prd.json'],
    },
  ],
};

export default WEAPONS;
