import {
    arrayToClassList,
    chooseBestIconHandle,
    D4Item,
    getTextFromStl,
    resolveSno,
    resolveStoreProduct,
    resolveStringsList,
    toMagicType
} from "../d4.js";
import {
    areEqual,
    createEntity,
    D4Dependencies,
    deleteEntity,
    findEntity,
    StrapiActionResult,
    StrapiEmoteResp,
    StrapiEntry,
    StrapiItemReq,
    StrapiItemResp,
    StrapiQueryResult,
    updateEntity
} from "./common.js";

async function findItem(diabloId: number): Promise<StrapiQueryResult<StrapiItemResp>> {
    return findEntity('items', diabloId);
}

async function createItem(data: StrapiItemReq): Promise<StrapiActionResult<StrapiItemResp>> {
    return createEntity('items', 'Item', data);
}

async function updateItem(strapiId: number, data: StrapiItemReq): Promise<StrapiActionResult<StrapiItemResp>> {
    return updateEntity('items', 'Item', strapiId, data);
}

async function deleteItem(strapiId: number): Promise<StrapiActionResult<StrapiItemResp>> {
    return deleteEntity('items', 'Item', strapiId);
}

function areItemsEqual(base: StrapiItemReq, strapi: StrapiItemResp): boolean {
    if (!areEqual(base, strapi)) {
        return false;
    }

    if (base.itemType !== strapi.itemType) return false;
    if (base.magicType !== strapi.magicType) return false;
    return (base.transMog === strapi.transMog);
}

function makeStrapiItem(item: D4Item, deps: D4Dependencies, media: Map<string, number>): StrapiItemReq {
    // item strings
    const itemStringsList = resolveStringsList(item, deps.strings);

    // (optional) get item type + actor
    const itemActor = resolveSno(item.snoMount ?? item.snoActor, deps.actors);
    const itemActorStringsList = resolveStringsList(itemActor, deps.strings);
    const itemTypeSno = resolveSno(item.snoItemType, deps.itemTypes);
    const itemTypeStringsList = resolveStringsList(itemTypeSno, deps.strings);
    const storeProduct = resolveStoreProduct(item, deps.storeProducts);
    const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

    // composite cms friendly item
    const itemId = item.__snoID__;
    const name = getTextFromStl(itemActorStringsList, 'Name', getTextFromStl(itemStringsList, 'Name'));
    const description = getTextFromStl(itemActorStringsList, 'Description', getTextFromStl(itemStringsList, 'Description'));
    const itemType = getTextFromStl(itemTypeStringsList, 'Name');
    const transMog = item.bIsTransmog;
    const usableByClass = arrayToClassList(item.fUsableByClass);
    const magicType = toMagicType(item.eMagicType);
    const iconId = chooseBestIconHandle(item, itemActor);
    const icon = media.get(iconId + '.webp') ?? null;

    return {
        itemId,
        itemType,
        name,
        description,
        transMog,
        usableByClass,
        magicType,
        iconId,
        icon,
    }
}

async function syncItems(items: Map<string, D4Item>, deps: D4Dependencies, media: Map<string, number>): Promise<void> {
    for (const item of items.values()) {
        const base = makeStrapiItem(item, deps, media);
        const resp = await findItem(base.itemId);

        const dupDetected = resp.meta.pagination.total > 1;
        const noResults = resp.meta.pagination.total === 0;

        // handle duplicates
        if (dupDetected) {
            await Promise.all(resp.data.map((e: StrapiEntry<StrapiEmoteResp>) => deleteItem(e.id)));
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
}

export { syncItems }
