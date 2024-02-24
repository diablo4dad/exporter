import {
    areEqual,
    createEntity,
    deleteEntity,
    findEntity,
    StrapiActionResult,
    StrapiHeadstoneReq,
    StrapiHeadstoneResp,
    StrapiQueryResult,
    updateEntity,
} from "./common.js";

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

// function makeStrapiHeadstone(): StrapiHeadstoneReq {
//     return {
//
//     }
// }

export async function syncHeadstones() {

}
