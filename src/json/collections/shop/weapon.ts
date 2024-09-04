import { Category, CollectionDescriptor } from '../../index.js';

const WEAPONS: CollectionDescriptor = {
  name: 'Weapons',
  description: 'Weapon bundles',
  category: Category.SHOP_ITEMS,
  premium: true,
  children: [
    {
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Weapons_bar_stor001.prd.json',
      ],
    },
    {
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Weapons_bar_stor002.prd.json',
      ],
    },
    {
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Weapons_nec_stor001.prd.json',
      ],
    },
    {
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_Weapons_nec_stor002.prd.json',
      ],
    },
    {
      // encrypted
      storeProducts: [
        'json\\base\\meta\\StoreProduct\\Bundle_MagmaticArmaments.prd.json',
      ],
      // workaround
      claim: 'Cash Shop',
      items: [
        ['json\\base\\meta\\Item\\offHandsDruid_stor021.itm.json'],
        ['json\\base\\meta\\Item\\twoHandCrossbow_stor023.itm.json'],
        ['json\\base\\meta\\Item\\twoHandPolearm_stor017.itm.json'],
        ['json\\base\\meta\\Item\\twoHandScythe_stor013.itm.json'],
        ['json\\base\\meta\\Item\\twoHandSorcStaff_stor021.itm.json'],
      ],
    },
  ],
};

export default WEAPONS;
