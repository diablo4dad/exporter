import {
    CollectionItemReq,
    CollectionItemResp,
    CollectionResp,
    createEntity,
    D4Dependencies,
    ItemResp,
    StrapiActionResult,
    StrapiEntry,
    StrapiPostData,
} from "./common.js";
import {D4StoreProduct, resolveSno} from "../d4.js";
import {findCollection} from "./collections.js";
import {bundleItemFactory, extractItemFromProduct} from "./factory/bundles.js";
import {findItem} from "./items.js";

export async function createCollectionItem(data: CollectionItemReq): Promise<StrapiActionResult<CollectionItemResp>> {
    return createEntity('collection-items', 'Collection Item', data);
}

export async function syncBundleItems(
    bundles: Map<string, D4StoreProduct>,
    bundlesToSync: number[],
    deps: D4Dependencies,
) {
    for (const product of bundles.values()) {
        if (!bundlesToSync.includes(product.__snoID__)) {
            continue;
        }

        const resp = await findCollection(product.__snoID__);
        const dupDetected = resp.meta.pagination.total > 1;
        const noResults = resp.meta.pagination.total === 0;

        if (noResults) {
            throw new Error('Collection ' + product.__snoID__ + ' does not exist.');
        }

        if (dupDetected) {
            throw new Error('Collection ' + product.__snoID__ + ' duplicated.');
        }

        const collection: StrapiEntry<CollectionResp> = resp.data[0];

        for (const productItem of product.arBundledProducts) {
            const innerProduct = resolveSno(productItem, bundles);
            if (innerProduct === undefined) {
                console.warn("Detached bundle product.", product.__fileName__);
                continue;
            }

            const item = extractItemFromProduct(deps)(innerProduct);
            if (item === undefined) {
                // this is expected
                // filter out items store items that only
                // give platinum, battle pass tiers etc
                continue;
            }

            const itemId = item.__snoID__;
            const collectionItems: StrapiPostData<StrapiEntry<CollectionItemResp>[]> = collection.attributes.collectionItems;
            const existing = collectionItems.data.find((ci: StrapiEntry<CollectionItemResp>) =>
                ci.attributes.items.data.find(
                    (i: StrapiEntry<ItemResp>) => i.attributes.itemId == itemId
                )
            );

            if (existing) {
                continue;
            }

            const existingItem = await findItem(itemId);
            const dupDetected = existingItem.meta.pagination.total > 1;
            const noResults = existingItem.meta.pagination.total === 0;

            if (noResults) {
                console.log('Item ' + product.__snoID__ + ' does not exist.', item.__fileName__);
            }

            if (dupDetected) {
                console.log('Item ' + product.__snoID__ + ' duplicated.');
                continue;
            }

            const bundleItem = bundleItemFactory(deps)(product, innerProduct);
            const bundleItemReq = {
                ...bundleItem,
                collection: {connect: [{id: collection.id}]},
                items: {connect: [{id: existingItem.data[0].id}]},
            }

            // @ts-ignore
            const createResp = await createCollectionItem(bundleItemReq);
            console.log("Create Collection response", createResp);
        }
    }
}