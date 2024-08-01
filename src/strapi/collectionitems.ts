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
import {D4ChallengeCategory, D4ChallengeDefinition, D4SnoRef, D4StoreProduct, resolveSno} from "../d4.js";
import {doSyncChallengeDefinition, findCollection} from "./collections.js";
import {bundleItemFactory, extractItemFromProduct} from "./factory/bundles.js";
import {findItem} from "./items.js";
import {challengeRewardFactory} from "./factory/challenges.js";

export async function createCollectionItem(data: CollectionItemReq): Promise<StrapiActionResult<CollectionItemResp>> {
    return createEntity('collection-items', 'Collection Item', data);
}

async function locateItem(diabloId: number): Promise<StrapiEntry<ItemResp>>  {
    const resp = await findItem(diabloId);
    const dupDetected = resp.meta.pagination.total > 1;
    const noResults = resp.meta.pagination.total === 0;

    if (noResults) {
        throw new Error('Item ' + diabloId + ' does not exist.');
    }

    if (dupDetected) {
        throw new Error('Item ' + diabloId + ' duplicated.');
    }

    return resp.data[0];
}

async function locateCollection(diabloId: number): Promise<StrapiEntry<CollectionResp>> {
    const resp = await findCollection(diabloId);
    const dupDetected = resp.meta.pagination.total > 1;
    const noResults = resp.meta.pagination.total === 0;

    if (noResults) {
        throw new Error('Collection ' + diabloId + ' does not exist.');
    }

    if (dupDetected) {
        throw new Error('Collection ' + diabloId + ' duplicated.');
    }

    return resp.data[0];
}

function doesCollectionHaveItem(collection: StrapiEntry<CollectionResp>, itemId: number): boolean {
    const collectionItems: StrapiPostData<StrapiEntry<CollectionItemResp>[]> = collection.attributes.collectionItems;
    const existing = collectionItems.data.find((ci: StrapiEntry<CollectionItemResp>) =>
      ci.attributes.items.data.find(
        (i: StrapiEntry<ItemResp>) => i.attributes.itemId == itemId
      )
    );

    return existing !== undefined;
}

async function connectItemToCollection(baseReq: CollectionItemReq, collectionId: number, itemIds: number[]) {
    const bundleItemReq = {
        ...baseReq,
        collection: {connect: [{ "id": collectionId }]},
        items: {connect: itemIds.map(i => ({ "id": i }))},
    }

    console.log("Connect Item", bundleItemReq);

    await createCollectionItem(bundleItemReq);
}



export async function syncChallengeAchievements(
  challenges: Map<string, D4ChallengeDefinition>,
  challengesToSync: number[],
  deps: D4Dependencies,
): Promise<void> {
    for (const definition of challenges.values()) {
        // Global.cha
        if (!doSyncChallengeDefinition(definition)) {
            continue;
        }

        const doSync = async (achievementSno: D4SnoRef, subCategory: D4ChallengeCategory) => {
            const achievement = resolveSno(achievementSno, deps.achievements);
            if (achievement === undefined) {
                console.warn("Detached achievement.", achievementSno.__targetFileName__);
                return;
            }

            const collection = await locateCollection(subCategory.dwID);
            const rewards = challengeRewardFactory(deps)(subCategory, achievement);

            rewards.forEach(async r => {
                const items = r.items as number[];
                const strapiItems = await Promise.all(items.map(locateItem));
                const strapiItemIds = strapiItems.map(i => i.id);
                const itemsToConnect = strapiItemIds.filter(i => !doesCollectionHaveItem(collection, i));
                if (itemsToConnect) {
                    await connectItemToCollection(r, collection.id, itemsToConnect);
                    console.log("Connected Items!");
                }
            });
        }

        // Classes
        for (const category of definition.arCategories) {
            for (const achievementSno of category.arAchievementSnos) {
                await doSync(achievementSno, category);
            }

            // Barbarian
            for (const subCategory of category.arCategories) {
                for (const achievementSno of subCategory.arAchievementSnos) {
                    await doSync(achievementSno, subCategory);
                }
            }
        }
    }
}

export async function syncBundleItems(
    bundles: Map<string, D4StoreProduct>,
    bundlesToSync: number[],
    deps: D4Dependencies,
): Promise<void> {
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

        if (product.__snoID__ === 1827797) {
            console.log("Winter");
        }

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
                // console.warn("No items found for inner product.", innerProduct.__fileName__);
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
                continue;
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
            await createCollectionItem(bundleItemReq);
        }
    }
}