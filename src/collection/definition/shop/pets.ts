import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const PETS: CollectionDescriptor = {
  name: 'Pets',
  description: 'Pet bundles',
  category: Category.SHOP_ITEMS,
  premium: true,
  children: [
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_companion_stor001.prd.json'],
    },
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor002.prd.json'],
    },
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\AddOn_Companion_stor102_bird.prd.json'],
    },
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor100_schnoz.prd.json'],
    },
    // Lily
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor100.prd.json'],
    },
    // Azul
    {
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor100_fox.prd.json'],
    },
    {
      // Foe to friend
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor100_hydralisk.prd.json'],
    },
    {
      // Mirth of the earth
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor102.prd.json'],
    },
    {
      // The Springmoon Stag
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor100_deer.prd.json'],
    },
    {
      // The Cyclopean Cackle
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor100_cacodemonOG.prd.json'],
    },
    {
      // Souls of the Lost
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_Companion_stor100_lostSoul.prd.json'],
    },
  ],
};

export default PETS;
