import {
    arrayToClassList,
    chooseBestIconHandle,
    D4Item,
    getTextFromStl,
    resolveSno,
    resolveStringsList,
    toMagicType
} from "../d4.js";
import {
    D4Dependencies,
    issueGet,
    issuePutJson,
    StrapiItemRequest,
    StrapiItemResponse,
    StrapiQueryResult
} from "./common.js";

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

export { syncItems }
