import { CLASS_TYPES } from '../d4data/constant.js';
import { D4Actor, D4Item } from '../d4data/struct.js';

export function chooseBestIconHandle(item: D4Item, actor: D4Actor | undefined): number | null {
  // this seems to be the best icon when available
  if (item.unk_75d565b) {
    return item.unk_75d565b;
  }

  if (item.tInvImages) {
    if (item.tInvImages.length !== CLASS_TYPES.length) {
      console.warn(`Expecting tInvImages to contain ${CLASS_TYPES.length} images.`);
    } else {
      // default to male barbarian image if available
      if (item.tInvImages[2].hDefaultImage) {
        return item.tInvImages[2].hDefaultImage;
      }

      // otherwise, return any available variant
      for (const inventoryImage of item.tInvImages) {
        if (inventoryImage.hDefaultImage) {
          return inventoryImage.hDefaultImage;
        }
      }
    }
  }

  if (actor) {
    for (const itemData of actor.ptItemData) {
      if (itemData.hDefaultImage) {
        return itemData.hDefaultImage;
      }
    }
  }

  return null;
}
