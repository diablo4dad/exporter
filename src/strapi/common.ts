import {
    D4Actor,
    D4Emblem,
    D4Emote,
    D4Item,
    D4ItemType,
    D4MarkingShape,
    D4Power,
    D4StoreProduct,
    D4TownPortalCosmetic,
    D4Translation
} from "../d4.js";
import {STRAPI_API_TOKEN, STRAPI_SERVER} from "../config.js";

export type D4Dependencies = {
    actors: Map<string, D4Actor>,
    strings: Map<string, D4Translation>,
    items: Map<string, D4Item>,
    itemTypes: Map<string, D4ItemType>,
    powers: Map<string, D4Power>,
    storeProducts: Map<string, D4StoreProduct>,
    emotes: Map<string, D4Emote>,
    markings: Map<string, D4MarkingShape>,
    portals: Map<string, D4TownPortalCosmetic>,
    emblems: Map<string, D4Emblem>,
}

export function appendAuth(headers: Record<string, string> = {}) {
    return {
        ...headers,
        "Authorization": "bearer " + STRAPI_API_TOKEN,
    };
}

export function issueGet(uri: string, params: Record<string, string> = {}) {
    const url = new URL(uri, STRAPI_SERVER);

    Object
        .entries(params)
        .forEach(([k, v]) => url.searchParams.append(k, v));

    return fetch(url.href, {
        headers: appendAuth(),
    });
}

export function issuePostForm(uri: string, body: FormData) {
    const url = new URL(uri, STRAPI_SERVER);

    return fetch(url.href, {
        method: 'post',
        body: body,
        headers: appendAuth(),
    });
}

export function issuePostJson(uri: string, body: object) {
    const url = new URL(uri, STRAPI_SERVER);

    return fetch(url.href, {
        method: 'post',
        body: JSON.stringify(body),
        headers: appendAuth({
            'Content-Type': 'application/json',
        }),
    });
}

export function issuePutJson(uri: string, body: object) {
    const url = new URL(uri, STRAPI_SERVER);

    return fetch(url.href, {
        method: 'put',
        body: JSON.stringify(body),
        headers: appendAuth({
            'Content-Type': 'application/json',
        }),
    });
}

export function issueDelete(uri: string) {
    const url = new URL(uri, STRAPI_SERVER);

    return fetch(url.href, {
        method: 'delete',
        headers: appendAuth(),
    });
}

export async function checkForErrors(resp: Response, ...expectErrors: number[]): Promise<void> {
    if (!resp.ok && !expectErrors.includes(resp.status)) {
        console.error("Strapi request returned an error.", {
            status: resp.status,
            body: await resp.text(),
        });

        throw new StrapiServerError();
    }
}

export async function findEntity<Resp>(collection: string, diabloId: number, params: Record<string, string> = {}): Promise<StrapiQueryResult<Resp>> {
    const resp = await issueGet(`/api/${collection}`, {
        'publicationState': 'preview',
        'filters[itemId][$eq]': String(diabloId),
        ...params,
    });

    await checkForErrors(resp);

    return (await resp.json()) as StrapiQueryResult<Resp>;
}

export async function listEntities<Resp>(collection: string, page: number, pageSize: number): Promise<StrapiQueryResult<Resp>> {
    const resp = await issueGet(`/api/${collection}`, {
        'pagination[page]': String(page),
        'pagination[pageSize]': String(pageSize),
        'publicationState': 'preview',
    });

    await checkForErrors(resp);

    return (await resp.json()) as StrapiQueryResult<Resp>;
}

export async function createEntity<Req, Resp>(collection: string, label: string, data: Req): Promise<StrapiActionResult<Resp>> {
    const resp = await issuePostJson(`/api/${collection}`, { data });
    await checkForErrors(resp);

    const result = (await resp.json()) as StrapiActionResult<Resp>;

    console.log(`${label} ${result.data.id} created.`);

    return result;
}

export async function updateEntity<Req, Resp>(collection: string, label: string, strapiId: number, data: Req): Promise<StrapiActionResult<Resp>> {
    const resp = await issuePutJson(`/api/${collection}/${strapiId}` , { data });
    await checkForErrors(resp);

    const result = (await resp.json()) as StrapiActionResult<Resp>;

    console.log(`${label} ${result.data.id} updated.`);

    return result;
}

export async function deleteEntity<Resp>(collection: string, label: string, strapiId: number): Promise<StrapiActionResult<Resp>> {
    const resp = await issueDelete(`/api/${collection}/${strapiId}`);
    await checkForErrors(resp);

    const result = (await resp.json()) as StrapiActionResult<Resp>;

    console.log(`${label} ${result.data.id} deleted.`);

    return result;
}

class StrapiServerError extends Error {
    constructor(message: string = 'Strapi returned an error.') {
        super(message);
    }
}

type StrapiPostData<T> = {
    data: T,
}

type StrapiMediaItem = {
    id: number,
    name: string,
}

type StrapiQueryResult<T> = {
    data: StrapiEntry<T>[],
    meta: StrapiSearchMeta,
}

type StrapiPublishedMeta = {
    createdAt?: string,
    updatedAt?: string,
    publishedAt?: string,
}

type StrapiActionResult<T> = {
    data: StrapiEntry<T>,
    meta: StrapiSearchMeta,
}

type StrapiSearchMeta = {
    pagination: StrapiPagination,
}

type StrapiPagination = {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number,
}

type StrapiEntry<T> = {
    id: number,
    attributes: T,
    // meta
}

type StrapiBase<IconT> = {
    itemId: number,
    name: string,
    description: string,
    usableByClass: string[],
    iconId: number | null,
    icon: IconT | undefined,
    itemType: string,
}

type StrapiItemType<IconT> = StrapiBase<IconT> & StrapiPublishedMeta & {
    transMog: boolean,
    magicType: string,
    series: string,
    transmogName: string,
    // images
}

type StrapiCollection<CollectionItemT> = {
    order: number,
    name: string,
    description: string,
    collectionItems?: CollectionItemT[],
    category: string,
    itemId: number,
    platinum: number,
}

type StrapiCollectionItem<ItemT, CollectionT> = {
    name?: string,
    outOfRotation?: boolean,
    claim?: string,
    claimDescription?: string,
    claimZone?: string,
    claimMonster?: string,
    premium?: boolean,
    promotional?: boolean,
    season?: number,
    items?: ItemT[],
    collection?: CollectionT,
}

type IconReq = number | null;
type IconResp = StrapiPostData<StrapiEntry<StrapiMediaItem | null>>;

type CollectionItemReq = StrapiCollectionItem<number | null, number | null>;
// @ts-ignore
type CollectionItemResp = StrapiCollectionItem<StrapiPostData<StrapiEntry<ItemResp | null>>, StrapiPostData<CollectionResp | null>>;

type CollectionReq = StrapiCollection<number | null>;
// @ts-ignore
type CollectionResp = StrapiCollection<StrapiPostData<StrapiEntry<CollectionItemResp | null>>>;

type ItemReq = StrapiItemType<IconReq>;
type ItemResp = StrapiItemType<IconResp>;

export {ItemResp};
export {ItemReq};
export {StrapiItemType};
export {StrapiEntry};
export {StrapiPagination};
export {StrapiSearchMeta};
export {StrapiActionResult};
export {StrapiQueryResult};
export {StrapiMediaItem};
export {StrapiPostData};
export {StrapiCollection};
export {StrapiCollectionItem};
export {CollectionReq, CollectionResp, CollectionItemReq, CollectionItemResp};
