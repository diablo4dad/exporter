import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const CAT_MOUNTS: CollectionDescriptor = {
  name: 'Cat Mounts',
  description: 'Mount & Mount Armor bundles',
  category: Category.SHOP_ITEMS,
  premium: true,
  children: [
    {
      // Beast of Brimstone [encrypted]
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor004b.prd.json'],
      claim: 'Cash Shop',
      items: [
        ['json\\base\\meta\\Item\\mnt_stor004_cat.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor104_cat_stor.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor248_trophy.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor247_trophy.itm.json'],
      ],
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
  ],
};

export default CAT_MOUNTS;
