import {
    CLASS_TYPES,
    D4Emote,
    D4StoreProduct,
    getTextFromStl,
    resolveSno,
    resolveStoreProduct,
    resolveStringsList
} from "../d4.js";
import {
    areEqual,
    createEntity,
    D4Dependencies,
    deleteEntity,
    findEntity,
    StrapiActionResult,
    StrapiEmoteReq,
    StrapiEmoteResp,
    StrapiEntry,
    StrapiQueryResult,
    updateEntity
} from "./common.js";
import {MediaLookup} from "./media.js";

async function findEmote(diabloId: number): Promise<StrapiQueryResult<StrapiEmoteResp>> {
    return findEntity('emotes', diabloId);
}

async function createEmote(data: StrapiEmoteReq): Promise<StrapiActionResult<StrapiEmoteResp>> {
    return createEntity('emotes', 'Emote', data);
}

async function updateEmote(strapiId: number, data: StrapiEmoteReq): Promise<StrapiActionResult<StrapiEmoteResp>> {
    return updateEntity('emotes', 'Emote', strapiId, data);
}

async function deleteEmote(strapiId: number): Promise<StrapiActionResult<StrapiEmoteResp>> {
    return deleteEntity('emotes', 'Emote', strapiId);
}

function areEmotesEqual(base: StrapiEmoteReq, remote: StrapiEmoteResp): boolean {
    return areEqual(base, remote);
}

function findBestEmoteIcon(emote: D4Emote, storeProduct?: D4StoreProduct): number {
    if (storeProduct) {
        if (storeProduct.hStoreIconOverride) {
            return storeProduct.hStoreIconOverride;
        }
    }

    return emote.hImageNormal;
}

function makeStrapiEmote(emote: D4Emote, deps: D4Dependencies, media: Map<string, number>): StrapiEmoteReq {
    const emoteStringsList = resolveStringsList(emote, deps.strings);
    const powerSno = resolveSno(emote.snoPower, deps.powers);
    const storeProduct = resolveStoreProduct(emote, deps.storeProducts);

    const itemId = emote.__snoID__;
    const name = getTextFromStl(emoteStringsList, "Name");
    const description = getTextFromStl(emoteStringsList, "Description");
    const iconId = findBestEmoteIcon(emote, storeProduct);
    const icon = media.get(iconId + '.webp') ?? null;
    const usableByClass = powerSno
        ? powerSno.snoClassRequirement
            ? [powerSno.snoClassRequirement.name]
            : CLASS_TYPES
        : CLASS_TYPES;

    return {
        itemId,
        name,
        description,
        usableByClass,
        icon,
        iconId,
    }
}

async function syncEmotes(emotes: Map<string, D4Emote>, deps: D4Dependencies, media: MediaLookup) {
    for (const emote of emotes.values()) {
        const base = makeStrapiEmote(emote, deps, media);
        const resp = await findEmote(base.itemId);

        const dupDetected = resp.meta.pagination.total > 1;
        const noResults = resp.meta.pagination.total === 0;

        // handle duplicates
        if (dupDetected) {
            await Promise.all(resp.data.map((e: StrapiEntry<StrapiEmoteResp>) => deleteEmote(e.id)));
        }

        // create emote
        if (dupDetected || noResults) {
            await createEmote(base);
            continue;
        }

        // update emote
        const remote = resp.data[0];
        if (!areEmotesEqual(base, remote.attributes)) {
            await updateEmote(remote.id, base);
        }
    }
}

export {syncEmotes};