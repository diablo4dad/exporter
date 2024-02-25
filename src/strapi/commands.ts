import {D4Item} from "../d4.js";
import {
    createEntity,
    deleteEntity,
    findEntity,
    StrapiActionResult,
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

async function syncItems<T>(items: Map<string, T>, makeStrapiItem: (i: T) => StrapiItemReq): Promise<void> {
    for (const item of items.values()) {
        const base = makeStrapiItem(item);
        const resp = await findItem(base.itemId);

        const dupDetected = resp.meta.pagination.total > 1;
        const noResults = resp.meta.pagination.total === 0;

        // handle duplicates
        if (dupDetected) {
            await Promise.all(resp.data.map((e: StrapiEntry<StrapiItemResp>) => deleteItem(e.id)));
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

async function cleanUpItems(items: Map<string, D4Item>): Promise<void> {
    const itemByDiabloId = Array.of(...items.values()).map(i => [i.__snoID__, i]);

}

export {syncItems};