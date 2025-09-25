import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const CAT_MOUNTS: CollectionDescriptor = {
  name: 'Cat Mounts',
  description: 'Mount & Mount Armor bundles',
  category: Category.SHOP_ITEMS,
  premium: true,
  children: [
    {
      // Beast of Brimstone
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor004b.prd.json'],
    },
    {
      // The Dusk Walker
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor001.prd.json'],
    },
    {
      // The White Wildcat
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor003.prd.json'],
    },
    {
      // Wild Transcendence
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor002.prd.json'],
    },
    {
      // Ash'adar, Harbinger of the Dawn
      // Warcraft Legends II
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor009.prd.json'],
    },
    {
      // Demon of the Angry Sky
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor008.prd.json'],
    },
    {
      // Pride of the Acolytes
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor010.prd.json'],
    },
    {
      // The Nether Lion
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor012.prd.json'],
    },
    {
      // Hunters of the Haunt
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor014.prd.json'],
    },
  ],
};

export default CAT_MOUNTS;
