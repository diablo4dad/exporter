import {
  D4Dependencies,
  D4Ref,
  D4StoreProduct,
  D4Type,
  getTextFromStl,
  resolveSno,
  resolveStringsList,
  stu,
} from '../../d4.js';
import {
  aggregateItemList,
  composeName,
  D4DadCollectionItem,
  D4DadStoreProduct,
  D4DadTranslation,
  unpackStoreProduct,
} from '../index.js';

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

export function extractItemFromProduct(
  deps: D4Dependencies,
): (product: D4StoreProduct) => (D4Ref & D4Type) | undefined {
  return (product: D4StoreProduct): (D4Ref & D4Type) | undefined => {
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
