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
    areEqual,
    D4Dependencies,
    findEntity,
    issuePutJson,
    StrapiItemReq,
    StrapiItemResp,
    StrapiQueryResult
} from "./common.js";

async function findItem(diabloId: number): Promise<StrapiQueryResult<StrapiItemResp>> {
    return findEntity('items', diabloId);
}

function makeStrapiItem(item: D4Item, deps: D4Dependencies, media: Map<string, number>): StrapiItemReq {
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

function areItemsEqual(base: StrapiItemReq, strapi: StrapiItemResp): boolean {
    if (!areEqual(base, strapi)) {
        return false;
    }

    if (base.itemType !== strapi.itemType) return false;
    if (base.magicType !== strapi.magicType) return false;
    return (base.transMog === strapi.transMog);
}

async function syncItems(items: Map<string, D4Item>, deps: D4Dependencies, media: Map<string, number>): Promise<number> {
    for (const item of items.values()) {
        const baseItem = makeStrapiItem(item, deps, media);
        const strapiItemResult = await findItem(item.__snoID__);

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
