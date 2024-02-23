import {CLASS_TYPES, D4Emote, getTextFromStl, resolveSno, resolveStringsList} from "../d4";
import {
    checkForErrors,
    D4Dependencies,
    issueDelete,
    issueGet,
    issuePostJson,
    issuePutJson,
    StrapiActionResult,
    StrapiEmoteReq,
    StrapiEmoteResp,
    StrapiQueryResult
} from "./common";
import {MediaLookup} from "./media";

function areEmotesEqual(base: StrapiEmoteReq, remote: StrapiEmoteResp): boolean {
    if (base.itemId != remote.itemId) return false;
    if (base.icon !== remote.icon?.data?.id) return false;
    if (base.iconId != remote.iconId) return false;
    if (!base.usableByClass.every(c => remote.usableByClass.includes(c))) return false;
    if (!remote.usableByClass.every(c => base.usableByClass.includes(c))) return false;
    if (base.name !== remote.name) return false;
    return base.description === remote.description;
}

function makeStrapiEmote(emote: D4Emote, deps: D4Dependencies, media: Map<string, number>): StrapiEmoteReq {
    const emoteStringsList = resolveStringsList(emote, deps.strings);
    const powerSno = resolveSno(emote.snoPower, deps.powers);

    const itemId = emote.__snoID__;
    const name = getTextFromStl(emoteStringsList, "Name");
    const description = getTextFromStl(emoteStringsList, "Description");
    const iconId = emote.hImageNormal;
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

async function getEmote(emoteId: number): Promise<StrapiQueryResult<StrapiEmoteResp>> {
    const resp = await issueGet('/api/emotes', {
        'publicationState': 'preview',
        'populate': '*',
        'filters[itemId][$eq]': String(emoteId),
    });

    await checkForErrors(resp);

    return (await resp.json()) as StrapiQueryResult<StrapiEmoteResp>;
}

async function createEmote(emote: StrapiEmoteReq): Promise<StrapiActionResult<StrapiEmoteResp>> {
    const resp = await issuePostJson('/api/emotes', { data: emote });
    await checkForErrors(resp);

    const result = (await resp.json()) as StrapiActionResult<StrapiEmoteResp>;

    console.log(`Emote ${result.data.id} created.`);

    return result;
}

async function updateEmote(strapiEmoteId: number, emote: StrapiEmoteReq): Promise<StrapiActionResult<StrapiEmoteResp>> {
    const resp = await issuePutJson(`/api/emotes/${strapiEmoteId}` , { data: emote });
    await checkForErrors(resp);

    const result = (await resp.json()) as StrapiActionResult<StrapiEmoteResp>;

    console.log(`Emote ${result.data.id} updated.`);

    return result;
}

async function deleteEmote(strapiEmoteId: number): Promise<StrapiActionResult<StrapiEmoteResp>> {
    const resp = await issueDelete(`/api/emotes/${strapiEmoteId}`);
    await checkForErrors(resp);

    const result = (await resp.json()) as StrapiActionResult<StrapiEmoteResp>;

    console.log(`Emote ${result.data.id} deleted.`);

    return result;
}

async function syncEmotes(emotes: Map<string, D4Emote>, deps: D4Dependencies, media: MediaLookup) {
    for (const emote of emotes.values()) {
        const base = makeStrapiEmote(emote, deps, media);
        const resp = await getEmote(base.itemId);

        const dupDetected = resp.meta.pagination.total > 1;
        const noResults = resp.meta.pagination.total === 0;

        // handle duplicates
        if (dupDetected) {
            await Promise.all(resp.data.map(e => deleteEmote(e.id)));
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