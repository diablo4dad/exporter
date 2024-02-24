import {
    areEqual,
    createEntity,
    D4Dependencies,
    deleteEntity,
    findEntity,
    StrapiActionResult,
    StrapiEntry,
    StrapiPortalReq,
    StrapiPortalResp,
    StrapiQueryResult,
    updateEntity,
} from "./common.js";
import {
    CLASS_TYPES,
    D4StoreProduct,
    D4TownPortalCosmetic,
    getTextFromStl,
    resolveStoreProduct,
    resolveStringsList
} from "../d4.js";
import {MediaLookup} from "./media.js";

async function findPortal(diabloId: number): Promise<StrapiQueryResult<StrapiPortalResp>> {
    return findEntity('portals', diabloId);
}

async function createPortal(data: StrapiPortalReq): Promise<StrapiActionResult<StrapiPortalResp>> {
    return createEntity('portals', 'Portal', data);
}

async function updatePortal(strapiId: number, data: StrapiPortalReq): Promise<StrapiActionResult<StrapiPortalResp>> {
    return updateEntity('portals', 'Portal', strapiId, data);
}

async function deletePortal(strapiId: number): Promise<StrapiActionResult<StrapiPortalResp>> {
    return deleteEntity('portals', 'Portal', strapiId);
}

function arePortalsEqual(base: StrapiPortalReq, remote: StrapiPortalResp): boolean {
    return areEqual(base, remote);
}

function findBestPortalIcon(actor: D4TownPortalCosmetic, storeProduct?: D4StoreProduct): number {
    if (storeProduct) {
        if (storeProduct.hStoreIconOverride) {
            return storeProduct.hStoreIconOverride;
        }
    }

    return actor.hIconImage;
}

function makeStrapiPortal(headstone: D4TownPortalCosmetic, deps: D4Dependencies, media: Map<string, number>): StrapiPortalReq {
    const storeProduct = resolveStoreProduct(headstone, deps.storeProducts);
    const stringsList = resolveStringsList(storeProduct, deps.strings);

    const itemId = headstone.__snoID__;
    const name = getTextFromStl(stringsList, "Name");
    const description = getTextFromStl(stringsList, "Description");
    const iconId = findBestPortalIcon(headstone, storeProduct);
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

export async function syncPortals(portals: Map<string, D4TownPortalCosmetic>, deps: D4Dependencies, media: MediaLookup) {
    for (const portal of portals.values()) {
        const base = makeStrapiPortal(portal, deps, media);
        const resp = await findPortal(base.itemId);

        const dupDetected = resp.meta.pagination.total > 1;
        const noResults = resp.meta.pagination.total === 0;

        // handle duplicates
        if (dupDetected) {
            await Promise.all(resp.data.map((e: StrapiEntry<StrapiPortalResp>) => deletePortal(e.id)));
        }

        // create portal
        if (dupDetected || noResults) {
            await createPortal(base);
            continue;
        }

        // update portal
        const remote = resp.data[0];
        if (!arePortalsEqual(base, remote.attributes)) {
            await updatePortal(remote.id, base);
        }
    }
}
