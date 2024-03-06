import {
    CollectionItemReq,
    CollectionItemResp,
    CollectionReq,
    CollectionResp,
    createEntity,
    D4Dependencies,
    deleteEntity,
    findEntity,
    ItemReq,
    ItemResp,
    listEntities,
    StrapiActionResult,
    StrapiEntry,
    StrapiMediaItem,
    StrapiPostData,
    StrapiQueryResult,
    updateEntity
} from "./common.js";
import {D4StoreProduct, resolveSno} from "../d4.js";
import {bundleItemFactory, extractItemFromProduct} from "./factory/bundles.js";

async function findItem(diabloId: number): Promise<StrapiQueryResult<ItemResp>> {
    return findEntity('items', diabloId, {
        'populate': '*',
    });
}

async function createItem(data: ItemReq): Promise<StrapiActionResult<ItemResp>> {
    return createEntity('items', 'Item', data);
}

async function updateItem(strapiId: number, data: Partial<ItemReq>): Promise<StrapiActionResult<ItemResp>> {
    return updateEntity('items', 'Item', strapiId, data);
}

async function deleteItem(strapiId: number): Promise<StrapiActionResult<ItemResp>> {
    return deleteEntity('items', 'Item', strapiId);
}

async function listItems(page: number, pageSize: number): Promise<StrapiQueryResult<ItemResp>> {
    return listEntities('items', page, pageSize);
}

async function findCollection(diabloId: number): Promise<StrapiQueryResult<CollectionResp>> {
    return findEntity('collections', diabloId, {
        'populate[collectionItems][populate][0]': 'items',
    });
}

async function createCollection(data: CollectionReq): Promise<StrapiActionResult<CollectionResp>> {
    return createEntity('collections', 'Collection', data);
}

async function updateCollection(strapiId: number, data: CollectionReq): Promise<StrapiActionResult<CollectionResp>> {
    return updateEntity('collections', 'Collection', strapiId, data);
}

async function deleteCollection(strapiId: number): Promise<StrapiActionResult<CollectionResp>> {
    return deleteEntity('collections', 'Collection', strapiId);
}

async function findCollectionItem(diabloId: number): Promise<StrapiQueryResult<CollectionItemResp>> {
    return findEntity('collection-items', diabloId);
}

async function createCollectionItem(data: CollectionItemReq): Promise<StrapiActionResult<CollectionItemResp>> {
    return createEntity('collection-items', 'Collection Item', data);
}

function areItemsEqual(base: ItemReq, strapi: ItemResp): boolean {
    if (base.itemId != strapi.itemId) return false;
    if (base.iconId != strapi.iconId) return false;
    if (!base.usableByClass.every((c: string) => strapi.usableByClass.includes(c))) return false;
    if (!strapi.usableByClass.every((c: string) => base.usableByClass.includes(c))) return false;
    if (base.name !== strapi.name) return false;
    if (base.description !== strapi.description) return false;
    if (base.itemType !== strapi.itemType) return false;

    // if icon is missing, no compare
    // these are patched manually in the cms
    if (base.icon) {
        // only compare icon if it's been populated
        if (strapi.icon) {
            if (base.icon !== strapi.icon.data?.id) {
                return false;
            }
        }
    }

    if (base.itemType !== strapi.itemType) return false;
    if (base.magicType !== strapi.magicType) return false;
    return (base.transMog === strapi.transMog);
}

function areCollectionsEqual(base: CollectionReq, strapi: CollectionResp): boolean {
    if (base.name !== strapi.name) return false;
    if (base.description !== strapi.description) return false;
    if (base.category !== strapi.category) return false;
    return base.itemId == strapi.itemId;
}

const ITEM_TYPES_TO_SYNC = [
    "Mount",
    "Horse Armor",
    "Trophy", "Back Trophy",
    "Axe", "Dagger", "Focus", "Mace", "Scythe", "Shield", "Sword", "Totem", "Wand", "Two-Handed Axe", "Bow", "Crossbow", "Two-Handed Mace", "Polearm", "Two-Handed Scythe", "Staff", "Two-Handed Sword",
    "Chest Armor", "Boots", "Gloves", "Helm", "Pants",
    "Body Marking", "Emote", "Town Portal", "Headstone", "Emblem",
    "Player Title (Prefix)", "Player Title (Suffix)"
]

function doNotSyncItem(item: ItemReq): boolean {
    if (!ITEM_TYPES_TO_SYNC.includes(item.itemType)) {
        return true;
    }

    if (item.name === '') {
        return true;
    }

    return item.itemType === '';
}

async function syncItems<T>(items: Map<string, T>, makeStrapiItem: (i: T) => ItemReq, uploadImage: (iconId: number) => Promise<StrapiMediaItem | null>): Promise<number[]> {
    // record of synced items
    const itemsToKeep = [];

    for (const item of items.values()) {
        const base = makeStrapiItem(item);
        if (doNotSyncItem(base)) {
            continue;
        }

        // add to keep list
        itemsToKeep.push(base.itemId);

        // uploading missing icons
        if (base.iconId && !base.icon) {
            const resp = await uploadImage(base.iconId);
            if (resp) {
                base.icon = resp.id;
            }
        }

        const resp = await findItem(base.itemId);
        const dupDetected = resp.meta.pagination.total > 1;
        const noResults = resp.meta.pagination.total === 0;

        // handle duplicates
        if (dupDetected) {
            await Promise.all(resp.data.map((e: StrapiEntry<ItemResp>) => deleteItem(e.id)));
        }

        // create headstone
        if (dupDetected || noResults) {
            await createItem(base);
            continue;
        }

        // update headstone
        const remote = resp.data[0];
        if (!areItemsEqual(base, remote.attributes)) {
            await updateItem(remote.id, base);
        }
    }

    return itemsToKeep;
}

function doSyncBundle(base: CollectionReq,  product: D4StoreProduct): boolean {
    if (!product.__fileName__.includes("Bundle")) {
        return false;
    }

    return base.name !== '';
}

export async function syncBundles(
    bundles: Map<string, D4StoreProduct>,
    makeBundle: (i: D4StoreProduct) => CollectionReq,
): Promise<number[]> {
    const collections: number[] = [];

    for (const product of bundles.values()) {
        const base = makeBundle(product);
        if (!doSyncBundle(base, product)) {
            continue;
        }

        collections.push(base.itemId);

        const resp = await findCollection(base.itemId);
        const dupDetected = resp.meta.pagination.total > 1;
        const noResults = resp.meta.pagination.total === 0;

        // handle duplicates
        if (dupDetected) {
            await Promise.all(resp.data.map((e: StrapiEntry<CollectionResp>) => deleteCollection(e.id)));
        }

        // create collection
        if (dupDetected || noResults) {
            await createCollection(base);
            continue;
        }

        // update collection
        const remote = resp.data[0];
        if (!areCollectionsEqual(base, remote.attributes)) {
            await updateCollection(remote.id, base);
        }
    }

    return collections;
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
                collection: { connect: [{ id: collection.id }] },
                items: { connect: [{ id: existingItem.data[0].id }] },
            }

            // @ts-ignore
            const createResp = await createCollectionItem(bundleItemReq);
            console.log("Create Collection response", createResp);
        }
    }
}

async function cleanUpItems(itemsToKeep: number[]): Promise<void> {
    const itemsToDelete: number[] = [];
    const resp = await listItems(1, 100);

    for (let i = 1; i <= resp.meta.pagination.pageCount; i++) {
        const resp = await listItems(i, 100);
        for (const item of resp.data) {
            // queue items for deletion
            if (!itemsToKeep.includes(Number.parseInt(String(item.attributes.itemId)))) {
                if (!itemsToDelete.includes(item.id)) {
                    itemsToDelete.push(item.id);
                }
                continue;
            }

            // ensure all items are in published state
            if (!item.attributes.publishedAt) {
                const resp = await updateItem(item.id, {
                    publishedAt: new Date().toISOString(),
                });

                console.log("Published item.", resp);
            }
        }
    }

    console.log("Number of items to keep: " + itemsToKeep.length);
    console.log("Number of items to delete: " + itemsToDelete.length);

    for (const i of itemsToDelete) {
        await deleteItem(i);
    }
}

export {syncItems, cleanUpItems};