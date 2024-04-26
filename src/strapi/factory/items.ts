import {
    arrayToClassList,
    chooseBestIconHandle,
    D4Item,
    getTextFromStl,
    resolveSno,
    resolveStoreProduct,
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
        const storeProduct = resolveStoreProduct(item, deps.storeProducts);
        const storeProductStringsList = resolveStringsList(storeProduct, deps.strings);

        // composite cms friendly item
        const itemId = item.__snoID__;
        const name = getTextFromStl(itemActorStringsList, 'Name', getTextFromStl(itemStringsList, 'Name'));
        const description = getTextFromStl(itemStringsList, 'Description');
        const itemType = getTextFromStl(itemTypeStringsList, 'Name');
        const transMog = item.bIsTransmog;
        const usableByClass = arrayToClassList(item.fUsableByClass);
        const magicType = toMagicType(item.eMagicType, item.__snoID__);
        const iconId = chooseBestIconHandle(item, itemActor);
        const icon = media.get(iconId + '.webp') ?? null;
        const publishedAt = new Date().toISOString();
        const series = getTextFromStl(storeProductStringsList, 'Series');
        const transmogName = getTextFromStl(itemStringsList, 'TransmogName');
        const dropMinWorldTier = item.eDropMinWorldTier;
        const dropMinLevel = item.nDropMinLevel;
        const dropMaxLevel = item.nDropMaxLevel;

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
            publishedAt,
            series,
            transmogName,
            dropMinWorldTier,
            dropMinLevel,
            dropMaxLevel,
        }
    }
}
