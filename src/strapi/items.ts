import {
    createEntity,
    deleteEntity,
    findEntity,
    ItemReq,
    ItemResp,
    listEntities,
    StrapiActionResult,
    StrapiEntry,
    StrapiMediaItem,
    StrapiQueryResult,
    updateEntity
} from "./common.js";

export async function findItem(diabloId: number): Promise<StrapiQueryResult<ItemResp>> {
    return findEntity('items', diabloId, {
        'populate': '*',
    });
}

export async function createItem(data: ItemReq): Promise<StrapiActionResult<ItemResp>> {
    return createEntity('items', 'Item', data);
}

export async function updateItem(strapiId: number, data: Partial<ItemReq>): Promise<StrapiActionResult<ItemResp>> {
    return updateEntity('items', 'Item', strapiId, data);
}

export async function deleteItem(strapiId: number): Promise<StrapiActionResult<ItemResp>> {
    return deleteEntity('items', 'Item', strapiId);
}

export async function listItems(page: number, pageSize: number): Promise<StrapiQueryResult<ItemResp>> {
    return listEntities('items', page, pageSize);
}

export function areItemsEqual(base: ItemReq, strapi: ItemResp): boolean {
    if (base.itemId != strapi.itemId) return false;
    if (base.iconId != strapi.iconId) return false;
    if (!base.usableByClass.every((c: string) => strapi.usableByClass.includes(c))) return false;
    if (!strapi.usableByClass.every((c: string) => base.usableByClass.includes(c))) return false;
    if (base.name !== strapi.name) return false;
    if (base.description !== strapi.description) return false;
    if (base.itemType !== strapi.itemType) return false;
    if (base.series !== strapi.series) return false;
    if (base.transmogName !== strapi.transmogName) return false;

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

export async function publishAllItems(): Promise<void> {
    const resp = await listItems(1, 100);
    const itemsToPublish = [];

    for (let i = 1; i <= resp.meta.pagination.pageCount; i++) {
        const resp = await listItems(i, 100);
        for (const item of resp.data) {
            if (!item.attributes.publishedAt) {
                itemsToPublish.push(item.id);
            }
        }
    }

    console.log("Number of items to publish: " + itemsToPublish.length);

    for (const i of itemsToPublish) {
        await updateItem(i, {
            publishedAt: new Date().toISOString(),
        });
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