type StrapiPostData<T> = {
    data: T,
}

type StrapiMediaItem = {
    id: number,
    name: string,
}

type StrapiSearchResult<T> = {
    data: StrapiSearchData<T>[],
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

type StrapiSearchData<T> = {
    id: number,
    attributes: T,
}

type StrapiItemType = {
    itemId: number,
    name?: string,
    season?: number,
}

export type {
    StrapiItemType,
    StrapiMediaItem,
    StrapiPostData,
    StrapiSearchData,
    StrapiSearchResult,
    StrapiSearchMeta,
    StrapiPagination
}
