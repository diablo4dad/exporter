import {
    D4Actor,
    D4Emblem,
    D4Emote,
    D4Item,
    D4ItemType,
    D4MarkingShape,
    D4PlayerTitle,
    D4Power,
    D4StoreProduct,
    D4TownPortalCosmetic,
    D4Translation
} from "./d4.js";
import {parseFiles} from "./loader.js";
import {
    PATH_TO_D4ACTOR,
    PATH_TO_D4EMBLEMS,
    PATH_TO_D4EMOTE,
    PATH_TO_D4ITEM,
    PATH_TO_D4ITEM_TYPE,
    PATH_TO_D4MARKING_SHAPE,
    PATH_TO_D4PLAYER_TITLE,
    PATH_TO_D4POWER,
    PATH_TO_D4STORE_PRODUCT,
    PATH_TO_D4STRING_LIST,
    PATH_TO_D4TOWN_PORTAL
} from "./config.js";
import {getMediaIndex, uploadImage} from "./strapi/media.js";
import {D4Dependencies} from "./strapi/common.js";
import {itemFactory} from "./strapi/factory/items.js";
import {emoteFactory} from "./strapi/factory/emotes.js";
import {headstoneFactory} from "./strapi/factory/headstones.js";
import {portalFactory} from "./strapi/factory/portals.js";
import {emblemFactory} from "./strapi/factory/emblems.js";
import {markingShapeFactory} from "./strapi/factory/marking.js";
import {cleanUpItems, publishAllItems, syncItems} from "./strapi/items.js";
import {playerTitleFactory} from "./strapi/factory/title.js";
import {bundleFactory} from "./strapi/factory/bundles.js";
import {syncBundles} from "./strapi/collections.js";
import {syncBundleItems} from "./strapi/collectionitems.js";

const items = parseFiles<D4Item>(PATH_TO_D4ITEM);
const itemTypes = parseFiles<D4ItemType>(PATH_TO_D4ITEM_TYPE);
const actors = parseFiles<D4Actor>(PATH_TO_D4ACTOR);
const strings = parseFiles<D4Translation>(PATH_TO_D4STRING_LIST);
const emotes = parseFiles<D4Emote>(PATH_TO_D4EMOTE);
const portals = parseFiles<D4TownPortalCosmetic>(PATH_TO_D4TOWN_PORTAL);
const markings = parseFiles<D4MarkingShape>(PATH_TO_D4MARKING_SHAPE);
const powers = parseFiles<D4Power>(PATH_TO_D4POWER);
const storeProducts = parseFiles<D4StoreProduct>(PATH_TO_D4STORE_PRODUCT);
const emblems = parseFiles<D4Emblem>(PATH_TO_D4EMBLEMS);
const playerTitles = parseFiles<D4PlayerTitle>(PATH_TO_D4PLAYER_TITLE);
const headstones = new Map(Array.of(...actors.entries()).filter(([_, a]) => a.__fileName__.includes("headstone")));

const deps: D4Dependencies = {
    actors,
    emblems,
    emotes,
    itemTypes,
    items,
    markings,
    portals,
    powers,
    storeProducts,
    strings,
};

console.log("Read " + items.size + " items...");
console.log("Read " + itemTypes.size + " item types...");
console.log("Read " + actors.size + " actors...");
console.log("Read " + strings.size + " translations...");
console.log("Read " + emotes.size + " emotes...");
console.log("Read " + portals.size + " portals...");
console.log("Read " + markings.size + " markings...");
console.log("Read " + powers.size + " powers...");
console.log("Read " + storeProducts.size + " store products...");
console.log("Read " + playerTitles.size + " player titles...");

const app = async () => {
    const media = await getMediaIndex();
    const itemsToKeep: number[] = [];

    console.log("Publishing all items...");
    await publishAllItems();

    console.log("Syncing items...")
    itemsToKeep.push(...await syncItems(items, itemFactory(deps, media), uploadImage(media)));

    console.log("Syncing emotes...")
    itemsToKeep.push(...await syncItems(emotes, emoteFactory(deps, media), uploadImage(media)));

    console.log("Syncing headstones...");
    itemsToKeep.push(...await syncItems(headstones, headstoneFactory(deps, media), uploadImage(media)));

    console.log("Syncing town portals...");
    itemsToKeep.push(...await syncItems(portals, portalFactory(deps, media), uploadImage(media)));

    console.log("Syncing emblems...");
    itemsToKeep.push(...await syncItems(emblems, emblemFactory(deps, media), uploadImage(media)));

    console.log("Syncing body markings...");
    itemsToKeep.push(...await syncItems(markings, markingShapeFactory(deps, media), uploadImage(media)));

    console.log("Syncing player titles...");
    itemsToKeep.push(...await syncItems(playerTitles, playerTitleFactory(deps, media), uploadImage(media)));

    console.log("Syncing bundles...");
    const bundlesToSync = await syncBundles(storeProducts, bundleFactory(deps));

    console.log("Syncing bundle items...");
    await syncBundleItems(storeProducts, bundlesToSync, deps);

    console.log("Cleaning up DB...");
    await cleanUpItems(itemsToKeep);
}

app().then(() => {
    console.log("Process complete.");
});
