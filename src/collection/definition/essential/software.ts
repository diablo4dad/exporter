import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const SOFTWARE: CollectionDescriptor = {
  name: 'Software Purchase',
  description: 'Transmogs included with Pre-purchase, Deluxe and Ultimate editions',
  category: Category.GENERAL,
  items: [],
  patches: [],
  children: [
    {
      name: 'Vessel of Hatred',
      description: 'The Vessel of Hatred expansion',
      category: Category.GENERAL,
      claim: 'Promotional',
      claimDescription: 'Included with the Vessel of Hatred Ultimate edition.',
      premium: true,
      items: [
        ['json\\base\\meta\\Item\\cmp_stor100_pantheraKitten.itm.json'],
        ['json\\base\\meta\\Item\\cmp_stor100_dogLarge.itm.json'],
        ['json\\base\\meta\\Item\\mnt_dlux004_cat.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor207_cat_stor.itm.json'],
        ['json\\base\\meta\\Item\\mnt_stor218_trophy.itm.json'],
        ['json\\base\\meta\\Item\\cmp_base00_cat.itm.json'],
        ['json\\base\\meta\\Item\\trophy_glo002_stor.itm.json'],
        ['json\\base\\meta\\Item\\trophy_glo003_stor.itm.json'],
        ['json\\base\\meta\\TownPortalCosmetic\\portal_glo013_stor.tpc.json'],
        ['json\\base\\meta\\Item\\Helm_Cosmetic_Barbarian_217_stor.itm.json'],
        ['json\\base\\meta\\Item\\Chest_Cosmetic_Barbarian_217_stor.itm.json'],
        ['json\\base\\meta\\Item\\Gloves_Cosmetic_Barbarian_217_stor.itm.json'],
        ['json\\base\\meta\\Item\\Pants_Cosmetic_Barbarian_217_stor.itm.json'],
        ['json\\base\\meta\\Item\\Boots_Cosmetic_Barbarian_217_stor.itm.json'],
        ['json\\base\\meta\\Item\\Helm_Cosmetic_Druid_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Chest_Cosmetic_Druid_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Gloves_Cosmetic_Druid_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Pants_Cosmetic_Druid_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Boots_Cosmetic_Druid_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Helm_Cosmetic_Necro_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Chest_Cosmetic_Necro_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Gloves_Cosmetic_Necro_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Pants_Cosmetic_Necro_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Boots_Cosmetic_Necro_210_stor.itm.json'],
        ['json\\base\\meta\\Item\\Helm_Cosmetic_Rogue_214_stor.itm.json'],
        ['json\\base\\meta\\Item\\Chest_Cosmetic_Rogue_214_stor.itm.json'],
        ['json\\base\\meta\\Item\\Gloves_Cosmetic_Rogue_214_stor.itm.json'],
        ['json\\base\\meta\\Item\\Pants_Cosmetic_Rogue_214_stor.itm.json'],
        ['json\\base\\meta\\Item\\Boots_Cosmetic_Rogue_214_stor.itm.json'],
        ['json\\base\\meta\\Item\\Helm_Cosmetic_Sorcerer_213_stor.itm.json'],
        ['json\\base\\meta\\Item\\Chest_Cosmetic_Sorcerer_213_stor.itm.json'],
        ['json\\base\\meta\\Item\\Gloves_Cosmetic_Sorcerer_213_stor.itm.json'],
        ['json\\base\\meta\\Item\\Pants_Cosmetic_Sorcerer_213_stor.itm.json'],
        ['json\\base\\meta\\Item\\Boots_Cosmetic_Sorcerer_213_stor.itm.json'],
        ['json\\base\\meta\\Item\\Helm_Cosmetic_Spiritborn_150_stor.itm.json'],
        ['json\\base\\meta\\Item\\Chest_Cosmetic_Spiritborn_150_stor.itm.json'],
        ['json\\base\\meta\\Item\\Gloves_Cosmetic_Spiritborn_150_stor.itm.json'],
        ['json\\base\\meta\\Item\\Pants_Cosmetic_Spiritborn_150_stor.itm.json'],
        ['json\\base\\meta\\Item\\Boots_Cosmetic_Spiritborn_150_stor.itm.json'],
      ],
      patches: [
        {
          items: [1869929], // Wings of the Damned
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
        {
          items: [1943442], // Hratli
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
        {
          items: [1872528], // Nahantu War-cat
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
        {
          items: [1841527], // War-cat Battledress
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
        {
          items: [1872515], // Spirit of the War-cat
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
        // spiritborn armor
        {
          items: [1895157],
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
        {
          items: [1895164],
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
        {
          items: [1895170],
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
        {
          items: [1895177],
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
        {
          items: [1895192],
          claimDescription: 'Included with the Vessel of Hatred Deluxe and Ultimate editions.',
        },
      ],
    },
    {
      name: 'Base Game',
      description: 'The original release of Diablo IV',
      category: Category.GENERAL,
      items: [
        ['json\\base\\meta\\Item\\mnt_stor004_horse.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor107_horse.itm.json'],
        ['json\\base\\meta\\Item\\mnt_dlux001_horse.itm.json'],
        ['json\\base\\meta\\Item\\mnt_amor100_horse_dlux.itm.json'],
        ['json\\base\\meta\\Emote\\emote_promo_WingsOfTheCreator.emo.json'],
      ],
      patches: [
        {
          items: [1203945],
          claim: 'Promotional',
          claimDescription: 'Pre-purchase bonus.',
          outOfRotation: true,
          premium: true,
        },
        {
          items: [1195579],
          claim: 'Promotional',
          claimDescription: 'Pre-purchase bonus.',
          outOfRotation: true,
          premium: true,
        },
        {
          items: [1327414],
          claim: 'Promotional',
          claimDescription: 'Included with the Diablo 4 Deluxe and Ultimate editions.',
          premium: true,
        },
        {
          items: [1327219],
          claim: 'Promotional',
          claimDescription: 'Included with the Diablo 4 Deluxe and Ultimate editions.',
          premium: true,
        },
        {
          items: [1308904],
          claim: 'Promotional',
          claimDescription: 'Included with the Diablo 4 Ultimate edition.',
          premium: true,
        },
      ],
    },
  ],
};

export default SOFTWARE;
