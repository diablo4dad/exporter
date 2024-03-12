import {
    CollectionReq,
    CollectionResp,
    createEntity,
    deleteEntity,
    findEntity,
    StrapiActionResult,
    StrapiEntry,
    StrapiQueryResult,
    updateEntity
} from "./common.js";
import {D4StoreProduct} from "../d4.js";

export async function findCollection(diabloId: number): Promise<StrapiQueryResult<CollectionResp>> {
    return findEntity('collections', diabloId, {
        'populate[collectionItems][populate][0]': 'items',
    });
}

export async function createCollection(data: CollectionReq): Promise<StrapiActionResult<CollectionResp>> {
    return createEntity('collections', 'Collection', data);
}

export async function updateCollection(strapiId: number, data: CollectionReq): Promise<StrapiActionResult<CollectionResp>> {
    return updateEntity('collections', 'Collection', strapiId, data);
}

export async function deleteCollection(strapiId: number): Promise<StrapiActionResult<CollectionResp>> {
    return deleteEntity('collections', 'Collection', strapiId);
}

export function areCollectionsEqual(base: CollectionReq, strapi: CollectionResp): boolean {
    if (base.name !== strapi.name) return false;
    if (base.description !== strapi.description) return false;
    if (base.category !== strapi.category) return false;
    return base.itemId == strapi.itemId;
}

export function doSyncBundle(base: CollectionReq, product: D4StoreProduct): boolean {
    if (!product.__fileName__.includes("Bundle")) {
        return false;
    }

    if (product.arBundledProducts.length <= 1) {
        return false;
    }

    return base.name !== '';
}

export async function syncBundles(
    bundles: Map<string, D4StoreProduct>,
    makeBundle: (i: D4StoreProduct, delta: number) => CollectionReq,
): Promise<number[]> {
    const collections: number[] = [];

    let i = 0;
    for (const product of bundles.values()) {
        const base = makeBundle(product, i++);
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
