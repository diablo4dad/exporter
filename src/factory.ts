import {D4Item} from "./d4";
import {StrapiItemType} from "./strapi";

function toStrapiItem(item: D4Item): StrapiItemType {
    const itemId = item.__snoID__;

    return {
        itemId,
    }
}
