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
import {D4ChallengeCategory, D4ChallengeDefinition, D4StoreProduct,} from "../d4.js";

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

export function doSyncChallengeDefinition(challenge: D4ChallengeDefinition): boolean {
    return challenge.__fileName__.includes("Global");
}

export function doSyncChallengeCategory(category: D4ChallengeCategory): boolean {
    return category.dwID !== -1;
}

async function syncCollection(
  base: CollectionReq,
): Promise<StrapiEntry<CollectionResp>> {
    const resp = await findCollection(base.itemId);
    const dupDetected = resp.meta.pagination.total > 1;
    const noResults = resp.meta.pagination.total === 0;

    // handle duplicates
    if (dupDetected) {
        await Promise.all(resp.data.map((e: StrapiEntry<CollectionResp>) => deleteCollection(e.id)));
    }

    // create collection
    if (dupDetected || noResults) {
        const result = await createCollection(base);

        return result.data;
    }

    // update collection
    const remote = resp.data[0];
    if (!areCollectionsEqual(base, remote.attributes)) {
        // prevent disconnection of collection items
        delete base.collectionItems;

        await updateCollection(remote.id, base);
    }

    return remote;
}

export async function syncChallenges(
  challenges: Map<string, D4ChallengeDefinition>,
  makeChallenge: (definition: D4ChallengeDefinition, category: D4ChallengeCategory, delta: number) => CollectionReq,
): Promise<number[]> {
    const collections: number[] = [];

    let i = 0;
    for (const definition of challenges.values()) {
        if (!doSyncChallengeDefinition(definition)) {
            continue;
        }

        for (const category of definition.arCategories) {
            if (!doSyncChallengeCategory(category)) {
                continue;
            }

            collections.push(category.dwID);

            const base = makeChallenge(definition, category, i++);
            const remote = await syncCollection(base);

            for (const subCategory of category.arCategories) {
                if (!doSyncChallengeCategory(subCategory)) {
                    continue;
                }

                const subBase = makeChallenge(definition, subCategory, i++);
                const subBaseConnect = {
                    ...subBase,
                    subcollection: remote.id,
                }

                await syncCollection(subBaseConnect);
                collections.push(subBase.itemId);
            }
        }
    }

    return collections;
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

        await syncCollection(base);

        collections.push(base.itemId);
    }

    return collections;
}
