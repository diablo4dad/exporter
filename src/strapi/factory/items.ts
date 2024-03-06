import {
    arrayToClassList,
    chooseBestIconHandle,
    D4Item,
    getTextFromStl,
    resolveSno,
    resolveStringsList,
    toMagicType
} from "../../d4.js";
import {D4Dependencies, ItemReq} from "../common.js";

export function itemFactory(deps: D4Dependencies, media: Map<string, number>): (item: D4Item) => ItemReq {
    return (item: D4Item): ItemReq => {
        // item strings
        const itemStringsList = resolveStringsList(item, deps.strings);

        // (optional) get item type + actor
        const itemActor = resolveSno(item.snoMount ?? item.snoActor, deps.actors);
        const itemActorStringsList = resolveStringsList(itemActor, deps.strings);
        const itemTypeSno = resolveSno(item.snoItemType, deps.itemTypes);
        const itemTypeStringsList = resolveStringsList(itemTypeSno, deps.strings);
        // const storeProduct = resolveStoreProduct(item, deps.storeProducts);
        // const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

        // composite cms friendly item
        const itemId = item.__snoID__;
        const name = getTextFromStl(itemActorStringsList, 'Name', getTextFromStl(itemStringsList, 'Name'));
        const description = getTextFromStl(itemActorStringsList, 'Description', getTextFromStl(itemStringsList, 'Description'));
        const itemType = getTextFromStl(itemTypeStringsList, 'Name');
        const transMog = item.bIsTransmog;
        const usableByClass = arrayToClassList(item.fUsableByClass);
        const magicType = toMagicType(item.eMagicType);
        const iconId = chooseBestIconHandle(item, itemActor);
        const icon = media.get(iconId + '.webp') ?? null;

        return {
            itemId,
            itemType,
            name,
            description,
            transMog,
            usableByClass,
            magicType,
            iconId,
            icon,
        }
    }
}
