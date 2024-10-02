import { Category, CollectionDescriptor } from '../../index.js';

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
      // workaround
      claim: 'Cash Shop',
      items: [
        ['json\\base\\meta\\TownPortalCosmetic\\portal_sor001_stor.tpc.json'],
        ['json\\base\\meta\\TownPortalCosmetic\\portal_rog001_stor.tpc.json'],
        ['json\\base\\meta\\TownPortalCosmetic\\portal_nec001_stor.tpc.json'],
        ['json\\base\\meta\\TownPortalCosmetic\\portal_dru001_stor.tpc.json'],
        ['json\\base\\meta\\TownPortalCosmetic\\portal_bar001_stor.tpc.json'],
      ],
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
