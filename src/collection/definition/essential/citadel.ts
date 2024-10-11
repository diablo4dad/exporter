import * as mace from '../../../d4data/sno/mace.js';
import * as two_handed_staff from '../../../d4data/sno/two_handed_staff.js';
import * as two_handed_sword from '../../../d4data/sno/two_handed_sword.js';
import * as wand from '../../../d4data/sno/wand.js';
import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const DARK_CITADEL_VENDOR: CollectionDescriptor = {
  name: 'Vendor',
  description: 'Transmogs purchased from the Dark Citadel Vendor',
  category: Category.GENERAL,
  claim: 'Vendor',
  items: [
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_1HMace_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HSword_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HQuarterstaff_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_1HWand_Transmog.itm.json'],
  ],
  patches: [
    {
      items: [mace.DOOM_MACE],
      claimDescription: 'Purchased for 15,000 coins.',
    },
    {
      items: [two_handed_sword.RITUAL_IMPALER],
      claimDescription: 'Purchased for 20,000 coins.',
    },
    {
      items: [two_handed_staff.SCULPTED_QUARTERSTAFF],
      claimDescription: 'Purchased for 20,000 coins.',
    },
    {
      items: [wand.TWISTED_SPIRIT_WAND],
      claimDescription: 'Purchased for 15,000 coins.',
    },
  ],
};

const CITADEL: CollectionDescriptor = {
  name: 'Dark Citadel',
  description: 'Transmogs earned within the Dark Citadel',
  category: Category.GENERAL,
  children: [DARK_CITADEL_VENDOR],
};

export default CITADEL;
