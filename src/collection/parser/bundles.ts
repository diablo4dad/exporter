import { resolveSno, resolveStringsList } from '../../d4data/resolver.js';
import { D4Entity, D4StoreProduct } from '../../d4data/struct.js';
import { getTextFromStl } from '../../d4reader/strings.js';
import { D4Dependencies } from '../../d4reader/struct.js';
import { stu } from '../../helper.js';
import { aggregateItemList, composeName, unpackStoreProduct } from '../index.js';
import { D4DadCollectionItem, D4DadStoreProduct, D4DadTranslation } from '../struct.js';

export function extractItemFromProduct(deps: D4Dependencies): (product: D4StoreProduct) => D4Entity | undefined {
  return (product: D4StoreProduct): D4Entity | undefined => {
    if (product.snoEmote) {
      return resolveSno(product.snoEmote, deps.emotes);
    }

    if (product.snoItemTransmog) {
      return resolveSno(product.snoItemTransmog, deps.items);
    }

    if (product.snoHeadstone) {
      return resolveSno(product.snoHeadstone, deps.actors);
    }

    if (product.snoMount) {
      return resolveSno(product.snoMount, deps.items);
    }

    if (product.snoTownPortal) {
      return resolveSno(product.snoTownPortal, deps.portals);
    }

    if (product.snoEmblem) {
      return resolveSno(product.snoEmblem, deps.emblems);
    }

    if (product.snoMarkingShape) {
      return resolveSno(product.snoMarkingShape, deps.markings);
    }
  };
}

export function productToDad(deps: D4Dependencies): (product: D4StoreProduct) => [D4DadStoreProduct, D4DadTranslation] {
  return (product: D4StoreProduct): [D4DadStoreProduct, D4DadTranslation] => {
    const productStringsList = resolveStringsList(product, deps.strings);

    const id = product.__snoID__;
    const filename = product.__fileName__;
    const name = getTextFromStl(productStringsList, 'Name');
    const description = stu(getTextFromStl(productStringsList, 'Description'));
    const series = stu(getTextFromStl(productStringsList, 'Series'));
    const item = extractItemFromProduct(deps)(product)?.__snoID__;
    const bundledProducts = product.arBundledProducts
      .map((bp) => resolveSno(bp, deps.storeProducts))
      .map((bp) => bp?.__snoID__)
      .filter((bp) => bp !== undefined)
      .map(Number);

    return [
      {
        id,
        filename,
        item,
        bundledProducts: bundledProducts.length ? bundledProducts : undefined,
      },
      {
        name,
        description,
        series,
      },
    ];
  };
}

export function storeToCollectionItems(deps: D4Dependencies) {
  return (product: D4StoreProduct): D4DadCollectionItem[] => {
    const itemList = unpackStoreProduct(deps)(product);
    const itemListGroups = aggregateItemList(deps)(itemList);

    return itemListGroups
      .map((items, index) => ({
        id: index,
        name: composeName(deps)(...items),
        items: items.map((i) => i.__snoID__),
        claim: 'TODO',
      }))
      .filter((ci) => ci.items.length);
  };
}
