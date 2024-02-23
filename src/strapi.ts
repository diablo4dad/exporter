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

export type {
    StrapiItemType,
    StrapiMediaItem,
    StrapiPostData,
    StrapiEntry,
    StrapiQueryResult,
    StrapiSearchMeta,
    StrapiPagination,
    StrapiItemResponse,
    StrapiItemRequest,
    StrapiEmoteResp,
    StrapiEmoteReq,
    StrapiActionResult,
}
