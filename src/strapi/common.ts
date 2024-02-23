import {D4Actor, D4ItemType, D4Power, D4Translation} from "../d4";
import {STRAPI_API_TOKEN, STRAPI_SERVER} from "../config";

export type D4Dependencies = {
    actors: Map<string, D4Actor>,
    strings: Map<string, D4Translation>,
    itemTypes: Map<string, D4ItemType>,
    powers: Map<string, D4Power>,
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

class ItemNotFoundError extends Error {
    constructor(itemType: string, itemId: string) {
        super(itemType + ' with ID ' + itemId + ' was not found.');
    }
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
type StrapiItemType<IconT> = {
    itemId: number,
    itemType: string,
    name: string,
    description: string,
    transMog: boolean,
    magicType: string,
    usableByClass: string[],
    iconId: number | null,
    icon: IconT | undefined,
    // images
}
type StrapiEmote<IconT> = {
    itemId: number,
    name: string,
    description: string,
    usableByClass: string[],
    iconId: number | null,
    icon: IconT | undefined,
}
type StrapiItemRequest = StrapiItemType<number | null>;
type StrapiItemResponse = StrapiItemType<StrapiPostData<StrapiEntry<StrapiMediaItem | null>>>;
type StrapiEmoteReq = StrapiEmote<number | null>;
type StrapiEmoteResp = StrapiEmote<StrapiPostData<StrapiEntry<StrapiMediaItem | null>>>;
export {StrapiEmoteResp};
export {StrapiEmoteReq};
export {StrapiItemResponse};
export {StrapiItemRequest};
export {StrapiItemType};
export {StrapiEntry};
export {StrapiPagination};
export {StrapiSearchMeta};
export {StrapiActionResult};
export {StrapiQueryResult};
export {StrapiMediaItem};
export {StrapiPostData};