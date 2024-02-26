import {D4Actor, D4ItemType, D4Power, D4StoreProduct, D4Translation} from "../d4.js";
import {STRAPI_API_TOKEN, STRAPI_SERVER} from "../config.js";

export type D4Dependencies = {
    actors: Map<string, D4Actor>,
    strings: Map<string, D4Translation>,
    itemTypes: Map<string, D4ItemType>,
    powers: Map<string, D4Power>,
    storeProducts: Map<string, D4StoreProduct>,
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

export async function findEntity<Resp>(collection: string, diabloId: number): Promise<StrapiQueryResult<Resp>> {
    const resp = await issueGet(`/api/${collection}`, {
        'publicationState': 'preview',
        'populate': '*',
        'filters[itemId][$eq]': String(diabloId),
    });

    await checkForErrors(resp);

    return (await resp.json()) as StrapiQueryResult<Resp>;
}

export async function listEntities<Resp>(collection: string, page: number, pageSize: number): Promise<StrapiQueryResult<Resp>> {
    const resp = await issueGet(`/api/${collection}`, {
        'pagination[page]': String(page),
        'pagination[pageSize]': String(pageSize),
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

type StrapiItemType<IconT> = StrapiBase<IconT> & {
    transMog: boolean,
    magicType: string,
    // images
}

type IconReq = number | null;
type IconResp = StrapiPostData<StrapiEntry<StrapiMediaItem | null>>;

type StrapiItemReq = StrapiItemType<IconReq>;
type StrapiItemResp = StrapiItemType<IconResp>;

export {StrapiItemResp};
export {StrapiItemReq};
export {StrapiItemType};
export {StrapiEntry};
export {StrapiPagination};
export {StrapiSearchMeta};
export {StrapiActionResult};
export {StrapiQueryResult};
export {StrapiMediaItem};
export {StrapiPostData};
