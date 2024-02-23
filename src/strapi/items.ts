import path from 'path';
import fs from 'fs'
import {StrapiItemRequest, StrapiItemResponse, StrapiMediaItem, StrapiQueryResult} from "../strapi";
import {partition} from "../helper";
import {
    arrayToClassList,
    chooseBestIconHandle,
    D4Item,
    getTextFromStl,
    resolveSno,
    resolveStringsList,
    toMagicType
} from "../d4";
import {D4Dependencies, issueGet, issuePostForm, issuePutJson} from "./common";

async function getMediaIndex(): Promise<Map<string, number>> {
    const resp = await issueGet('/api/upload/files');
    const data = await resp.json() as StrapiMediaItem[];
    if (!resp.ok) {
        console.log("Error syncing images...", {
            status_code: resp.status,
            data: data,
        });

        return new Map();
    }

    return new Map(
        data.map(m => [m.name, m.id]),
    );
}

async function uploadImages(imagesToUpload: string[]): Promise<StrapiMediaItem[]> {
    const form = imagesToUpload.reduce((form, img) => {
        const buffer = fs.readFileSync(img);
        const blob = new Blob([buffer], { type: 'image/webp' });
        form.append("files", blob, img);
        return form;
    }, new FormData());

    const resp = await issuePostForm('/api/upload', form);
    if (!resp.ok) {
        console.log("Error uploading images...", {
            status_code: resp.status,
            data: await resp.text(),
        });

        return [];
    }

    const data = await resp.json() as StrapiMediaItem[];

    console.log("Uploaded images...", data.map(media => media.name));

    return data;
}

async function syncImages(pathToImages: string, imagesToSync: string[], existingMedia: Map<string, number>): Promise<Map<string, number>> {
    // filter out images that already exist
    const imagesToUpload =
        imagesToSync
            .map(img => path.basename(img))
            .filter(img => !existingMedia.has(img))
            .map(img => path.join(pathToImages, img));

    // batch uploads into
    const uploadBatches =
        partition(imagesToUpload, 10)
            .map(uploadImages);

    // execute each upload
    const results =
        await Promise.all(uploadBatches);

    // convert to value pairs [filename, iconHandle]
    return new Map(
        results.flatMap(e => e.map(i => [i.name, i.id]))
    );
}

function makeStrapiItem(item: D4Item, deps: D4Dependencies, media: Map<string, number>): StrapiItemRequest {
    // item strings
    const itemStringsList = resolveStringsList(item, deps.strings);

    // (optional) get item type + actor
    const itemActor = resolveSno(item.snoActor, deps.actors);
    const itemTypeSno = resolveSno(item.snoItemType, deps.itemTypes);
    const itemTypeStringsList = resolveStringsList(itemTypeSno, deps.strings);

    // composite cms friendly item
    const itemId = item.__snoID__;
    const name = getTextFromStl(itemStringsList, 'Name');
    const description = getTextFromStl(itemStringsList, 'Description');
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

async function fetchStrapiItem(itemId: number): Promise<StrapiQueryResult<StrapiItemResponse>> {
    const resp = await issueGet('/api/items', {
        'publicationState': 'preview',
        'populate': '*',
        'filters[itemId][$eq]': String(itemId),
    });

    if (!resp.ok) {
        console.error("Server returning a non-success response.", {
            status: resp.status,
            body: await resp.text(),
        });

        throw new Error("Error fetching Strapi item.");
    }

    return (await resp.json()) as StrapiQueryResult<StrapiItemResponse>;
}

function areItemsEqual(base: StrapiItemRequest, strapi: StrapiItemResponse): boolean {
    if (base.itemId != strapi.itemId) return false; // strapi returns numbers as strings?
    if (base.name !== strapi.name) return false;
    if (base.description !== strapi.description) return false;
    if (base.itemType !== strapi.itemType) return false;
    if (base.magicType !== strapi.magicType) return false;
    if (base.transMog !== strapi.transMog) return false;
    if (base.iconId != strapi.iconId) return false; // strapi returns numbers as strings?
    if (!base.usableByClass.every(c => strapi.usableByClass.includes(c))) return false;
    if (!strapi.usableByClass.every(c => base.usableByClass.includes(c))) return false;

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

    return true;
}

async function syncItems(items: Map<string, D4Item>, deps: D4Dependencies, media: Map<string, number>): Promise<number> {
    for (const item of items.values()) {
        const baseItem = makeStrapiItem(item, deps, media);
        const strapiItemResult = await fetchStrapiItem(item.__snoID__);

        // handle duplication
        if (strapiItemResult.meta.pagination.total > 1) {
            console.warn("Found multiple results for item " + baseItem.itemId + "!");
            // manual intervention required
            continue;
        }

        // existing item
        if (strapiItemResult.meta.pagination.total === 1) {
            const { id, attributes } = strapiItemResult.data[0];
            if (!areItemsEqual(baseItem, attributes)) {
                console.log("Item are out of sync!", {
                    baseItem,
                    attributes,
                });

                const resp = await issuePutJson(`/api/items/${id}`, { data: baseItem });
                if (!resp.ok) {
                    console.error("Error updating item " + baseItem.itemId + "!", {
                        status: resp.status,
                        body: await resp.text(),
                    });
                }
            }

            continue;
        }

        // new entry
        console.log("Adding new item...");

    }

    return 0;
}

export { syncItems, syncImages, getMediaIndex }
