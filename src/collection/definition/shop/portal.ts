import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const PORTALS: CollectionDescriptor = {
  name: 'Portals',
  description: 'Portal bundles',
  category: Category.SHOP_ITEMS,
  premium: true,
  children: [
    {
      // encrypted
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_TPortals_stor001.prd.json'],
      outOfRotation: true,
    },
    {
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_TPortal_bar_stor001.prd.json'],
    },
    {
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_TPortal_dru_stor001.prd.json'],
    },
    {
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_TPortal_nec_stor001.prd.json'],
    },
    {
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_TPortal_rog_stor001.prd.json'],
    },
    {
      outOfRotation: true,
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_TPortal_sor_stor001.prd.json'],
    },
  ],
};

export default PORTALS;
