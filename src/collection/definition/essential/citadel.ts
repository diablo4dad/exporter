import * as dagger from '../../../d4data/sno/dagger.js';
import * as mace from '../../../d4data/sno/mace.js';
import * as two_handed_staff from '../../../d4data/sno/two_handed_staff.js';
import * as two_handed_sword from '../../../d4data/sno/two_handed_sword.js';
import * as wand from '../../../d4data/sno/wand.js';
import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const RAID: CollectionDescriptor = {
  name: 'Raid Drops',
  description: 'Transmogs dropped within the Dark Citadel',
  claim: 'Zone Drop',
  claimDescription: 'Looted from middle chests and bosses in the Dark Citadel.',
  category: Category.ACTIVITY,
  items: [
    ['json\\base\\meta\\Item\\mnt_amor05_cat.itm.json'],
    ['json\\base\\meta\\Item\\mnt_uniq70_trophy.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier1_Helm_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier1_Chest_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier1_Gloves_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier1_Pants_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier1_Boots_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_OffhandTotem_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_OffhandShield_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_OffhandFocus_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HSorcererStaff_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HScythe_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HPolearm_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HMace_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HGlaive_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HDruidStaff_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HCrossbow_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HBow_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HAxe_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_1HSword_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_1HScythe_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_1HAxe_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_1HMace_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HSword_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_2HQuarterstaff_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_1HWand_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticWeapon_1HDagger_Transmog.itm.json'],
  ],
  patches: [
    {
      items: [mace.DOOM_MACE],
      claimDescription: 'Purchased for 15,000 coins from the Dark Citadel vendor.',
    },
    {
      items: [two_handed_sword.RITUAL_IMPALER],
      claimDescription: 'Purchased for 20,000 coins from the Dark Citadel vendor.',
    },
    {
      items: [two_handed_staff.SCULPTED_QUARTERSTAFF],
      claimDescription: 'Purchased for 20,000 coins from the Dark Citadel vendor.',
    },
    {
      items: [wand.TWISTED_SPIRIT_WAND],
      claimDescription: 'Purchased for 15,000 coins from the Dark Citadel vendor.',
    },
    {
      items: [dagger.HOOKED_PIERCER],
      claimDescription: 'Purchased for 15,000 coins from the Dark Citadel vendor.',
    },
  ],
};

const RAID_TIER2: CollectionDescriptor = {
  name: 'Raid Drops (Tier II)',
  description: 'Transmogs dropped within the Dark Citadel on Torment IV',
  claim: 'Zone Drop',
  claimDescription: 'Looted from middle chests and bosses in the Dark Citadel.',
  category: Category.ACTIVITY,
  items: [
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier2_Helm_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier2_Chest_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier2_Pants_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier2_Gloves_Transmog.itm.json'],
    ['json\\base\\meta\\Item\\X1_Raid_CosmeticArmor_Tier2_Boots_Transmog.itm.json'],
  ],
};

const CITADEL: CollectionDescriptor = {
  name: 'Dark Citadel',
  description: 'Transmogs earned within the Dark Citadel',
  category: Category.GENERAL,
  children: [RAID, RAID_TIER2],
};

export default CITADEL;
