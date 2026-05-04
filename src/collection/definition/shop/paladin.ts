import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const PALADIN: CollectionDescriptor = {
  name: 'Paladin',
  description: 'Class specific bundles',
  category: Category.SHOP_ITEMS,
  premium: true,
  children: [
    {
      // Defenders of the Verdant Wild
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor165.prd.json'],
    },
    {
      // Heart of Emberthorn
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor163.prd.json'],
    },
    {
      // The Spectral Ossuarian
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor158.prd.json'],
    },
    {
      // Thirst of the Crimson Reign
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor161.prd.json'],
    },
    {
      // Pride of the red sand
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor167.prd.json'],
    },
    {
      // The Red Devil's Revolution
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor151.prd.json'],
    },
    {
      // The Onyx Sentinel
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor153.prd.json'],
    },
    {
      // Illumination of the sunbringer
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor155.prd.json'],
    },
    {
      // Sacrilege's Crucible
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor157.prd.json'],
    },
    {
      // Wolves of the Shattered Hearth
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor164.prd.json'],
    },
    {
      // Nocturne of the Ravensknight
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor159.prd.json'],
    },
    {
      // Sins of Wanton Delights
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor166.prd.json'],
    },
    {
      // Heretic for the Creatrix
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor173.prd.json'],
    },
    {
      // Magmus Oathforge
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor175.prd.json'],
    },
    {
      // The Holy Geist
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_pal_stor172.prd.json'],
    },
  ],
};

export default PALADIN;
