import { Category } from '../../constants.js';
import { CollectionDescriptor } from '../../struct.js';

const SPIRITBORN: CollectionDescriptor = {
  name: 'Spiritborn',
  description: 'Class specific bundles',
  category: Category.SHOP_ITEMS,
  premium: true,
  children: [
    {
      // The Devourer's Venom
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_spi_stor155.prd.json'],
    },
    {
      // The Seeker's Thunder
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_spi_stor156.prd.json'],
    },
    {
      // The Hunter's Fire
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_spi_stor158.prd.json'],
    },
    {
      // The Guardian's Fists
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_spi_stor157.prd.json'],
    },
    {
      // Mother's Memory
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_spi_stor159.prd.json'],
    },
    {
      // Spirit of Death
      // # Warcraft Legends II
      storeProducts: ['json\\base\\meta\\StoreProduct\\Bundle_HArmor_spi_stor154.prd.json'],
    },
  ],
};

export default SPIRITBORN;
