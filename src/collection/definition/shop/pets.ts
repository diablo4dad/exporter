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
  ],
};

export default PETS;
