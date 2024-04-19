import {CollectionItemReq, CollectionReq, D4Dependencies} from "../common.js";
import {D4Ref, D4StoreProduct, D4Type, getTextFromStl, resolveSno, resolveStringsList} from "../../d4.js";

export function bundleFactory(deps: D4Dependencies): (product: D4StoreProduct, delta: number) => CollectionReq {
    return (product: D4StoreProduct, delta: number = 0): CollectionReq => {
        const productStringsList = resolveStringsList(product, deps.strings);

        const storeProductId = product.__snoID__;
        const category = "Shop";
        const name = getTextFromStl(productStringsList, "Name");
        const description = getTextFromStl(productStringsList, "Series");
        const collectionItems: number[] = [];
        const order = 2000 + delta;
        const platinum = 0;

        return {
            name,
            description,
            category,
            collectionItems,
            itemId: storeProductId,
            order,
            platinum,
        }
    }
}

export function bundleItemFactory(deps: D4Dependencies): (bundle: D4StoreProduct, product: D4StoreProduct) => CollectionItemReq {
    return (bundle: D4StoreProduct, product: D4StoreProduct): CollectionItemReq => {
        const premium = true;
        const item = extractItemFromProduct(deps)(product);
        const itemId = item?.__snoID__;
        const collectionId = bundle.__snoID__;
        const items = itemId ? [itemId] : [];
        const collection = collectionId;
        const claim = "Cash Shop";

        return {
            items,
            collection,
            premium,
            claim,
        }
    }
}

export function extractItemFromProduct(deps: D4Dependencies): (product: D4StoreProduct) => D4Ref & D4Type | undefined {
    return (product: D4StoreProduct): D4Ref & D4Type | undefined => {
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
    }
}
