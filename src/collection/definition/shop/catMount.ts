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
      // The Dusk Walker [encrypted]
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor001.prd.json'],
      claim: 'Cash Shop',
      items: [
        ['json\\base\\meta\\Item\\mnt_stor001_cat.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor101_cat_stor.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor241_trophy.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor242_trophy.itm.json'],
      ],
    },
    {
      // The White Wildcat [encrypted]
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor003.prd.json'],
      claim: 'Cash Shop',
      items: [
        ['json\\base\\meta\\Item\\mnt_stor003_cat.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor103_cat_stor.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor246_trophy.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor245_trophy.itm.json'],
      ],
    },
    {
      // Wild Transcendence [encrypted]
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HMount_cat_stor002.prd.json'],
      claim: 'Cash Shop',
      items: [
        ['json\\base\\meta\\Item\\mnt_stor002_cat.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor102_cat_stor.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor244_trophy.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor243_trophy.itm.json'],
      ],
    },
  ],
};

export default CAT_MOUNTS;
