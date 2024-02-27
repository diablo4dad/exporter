import {
    createEntity,
    deleteEntity,
    findEntity,
    listEntities,
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

async function listItems(page: number, pageSize: number): Promise<StrapiQueryResult<StrapiItemResp>> {
    return listEntities('items', page, pageSize);
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

const ITEM_TYPES_TO_SYNC = [
    "Mount",
    "Horse Armor",
    "Trophy", "Back Trophy",
    "Axe", "Dagger", "Focus", "Mace", "Scythe", "Shield", "Sword", "Totem", "Wand", "Two-Handed Axe", "Bow", "Crossbow", "Two-Handed Mace", "Polearm", "Two-Handed Scythe", "Staff", "Two-Handed Sword",
    "Chest Armor", "Boots", "Gloves", "Helm", "Pants",
    "Body Marking", "Emote", "Town Portal", "Headstone", "Emblem",
    "Player Title (Prefix)", "Player Title (Suffix)"
]

function doNotSync(item: StrapiItemReq): boolean {
    if (!ITEM_TYPES_TO_SYNC.includes(item.itemType)) {
        return true;
    }

    if (item.name === '') {
        return true;
    }

    return item.itemType === '';
}

async function syncItems<T>(items: Map<string, T>, makeStrapiItem: (i: T) => StrapiItemReq): Promise<number[]> {
    // record of synced items
    const itemsToKeep = [];

    for (const item of items.values()) {
        const base = makeStrapiItem(item);
        if (doNotSync(base)) {
            continue;
        }

        // add to keep list
        itemsToKeep.push(base.itemId);

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

    return itemsToKeep;
}

async function cleanUpItems(itemsToKeep: number[]): Promise<void> {
    const itemsToDelete: number[] = [];
    const resp = await listItems(1, 100);

    for (let i = 1; i <= resp.meta.pagination.pageCount; i++) {
        const resp = await listItems(i, 100);
        for (const item of resp.data) {
            if (!itemsToKeep.includes(Number.parseInt(String(item.attributes.itemId)))) {
                if (!itemsToDelete.includes(item.id)) {
                    itemsToDelete.push(item.id);
                }
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