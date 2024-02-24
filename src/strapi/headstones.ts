import {
    areEqual,
    createEntity,
    D4Dependencies,
    deleteEntity,
    findEntity,
    StrapiActionResult,
    StrapiEmoteResp,
    StrapiEntry,
    StrapiHeadstoneReq,
    StrapiHeadstoneResp,
    StrapiQueryResult,
    updateEntity,
} from "./common.js";
import {CLASS_TYPES, D4Actor, D4StoreProduct, getTextFromStl, resolveStoreProduct, resolveStringsList} from "../d4.js";
import {MediaLookup} from "./media.js";

async function findHeadstone(diabloId: number): Promise<StrapiQueryResult<StrapiHeadstoneResp>> {
    return findEntity('headstones', diabloId);
}

async function createHeadstone(data: StrapiHeadstoneReq): Promise<StrapiActionResult<StrapiHeadstoneResp>> {
    return createEntity('headstones', 'Headstone', data);
}

async function updateHeadstone(strapiId: number, data: StrapiHeadstoneReq): Promise<StrapiActionResult<StrapiHeadstoneResp>> {
    return updateEntity('headstones', 'Headstone', strapiId, data);
}

async function deleteHeadstone(strapiId: number): Promise<StrapiActionResult<StrapiHeadstoneResp>> {
    return deleteEntity('headstones', 'Headstone', strapiId);
}

function areHeadstonesEqual(base: StrapiHeadstoneReq, remote: StrapiHeadstoneResp): boolean {
    return areEqual(base, remote);
}

function findBestHeadstoneIcon(actor: D4Actor, storeProduct?: D4StoreProduct): number {
    if (storeProduct) {
        if (storeProduct.hStoreIconOverride) {
            return storeProduct.hStoreIconOverride;
        }
    }

    return actor.ptUIData[0]?.hPortraitImage ?? 0;
}

function makeStrapiHeadstone(headstone: D4Actor, deps: D4Dependencies, media: Map<string, number>): StrapiHeadstoneReq {
    const stringsList = resolveStringsList(headstone, deps.strings);
    const storeProduct = resolveStoreProduct(headstone, deps.storeProducts);

    const itemId = headstone.__snoID__;
    const name = getTextFromStl(stringsList, "Name");
    const description = getTextFromStl(stringsList, "Description");
    const iconId = findBestHeadstoneIcon(headstone, storeProduct);
    const icon = iconId ? (media.get(iconId + '.webp') ?? null) : null;
    const usableByClass = CLASS_TYPES;

    return {
        itemId,
        name,
        description,
        iconId,
        icon,
        usableByClass,
    }
}

export async function syncHeadstones(headstones: Map<string, D4Actor>, deps: D4Dependencies, media: MediaLookup) {
    for (const headstone of headstones.values()) {
        const base = makeStrapiHeadstone(headstone, deps, media);
        const resp = await findHeadstone(base.itemId);

        const dupDetected = resp.meta.pagination.total > 1;
        const noResults = resp.meta.pagination.total === 0;

        // handle duplicates
        if (dupDetected) {
            await Promise.all(resp.data.map((e: StrapiEntry<StrapiEmoteResp>) => deleteHeadstone(e.id)));
        }

        // create headstone
        if (dupDetected || noResults) {
            await createHeadstone(base);
            continue;
        }

        // update headstone
        const remote = resp.data[0];
        if (!areHeadstonesEqual(base, remote.attributes)) {
            await updateHeadstone(remote.id, base);
        }
    }
}
