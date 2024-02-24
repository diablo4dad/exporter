import {
    D4Actor,
    D4Emote,
    D4Item,
    D4ItemType,
    D4MarkingShape,
    D4Power,
    D4TownPortalCosmetic,
    D4Translation
} from "./d4.js";
import {parseFiles} from "./loader.js";
import {
    PATH_TO_D4ACTOR,
    PATH_TO_D4DATA,
    PATH_TO_D4EMOTE,
    PATH_TO_D4ITEM,
    PATH_TO_D4ITEM_TYPE,
    PATH_TO_D4MARKING_SHAPE,
    PATH_TO_D4STRING_LIST,
    PATH_TO_D4TEXTURES,
    PATH_TO_D4TOWN_PORTAL,
    PATH_TO_POWER
} from "./config.js";
import {getTextures} from "./textures.js";
import {syncEmotes} from "./strapi/emotes.js";
import {getMediaIndex, syncImages} from "./strapi/media.js";

const items = parseFiles<D4Item>(PATH_TO_D4DATA, PATH_TO_D4ITEM);
const itemTypes = parseFiles<D4ItemType>(PATH_TO_D4DATA, PATH_TO_D4ITEM_TYPE);
const actors = parseFiles<D4Actor>(PATH_TO_D4DATA, PATH_TO_D4ACTOR);
const strings = parseFiles<D4Translation>(PATH_TO_D4DATA, PATH_TO_D4STRING_LIST);
const emotes = parseFiles<D4Emote>(PATH_TO_D4DATA, PATH_TO_D4EMOTE);
const portals = parseFiles<D4TownPortalCosmetic>(PATH_TO_D4DATA, PATH_TO_D4TOWN_PORTAL);
const markings = parseFiles<D4MarkingShape>(PATH_TO_D4DATA, PATH_TO_D4MARKING_SHAPE);
const powers = parseFiles<D4Power>(PATH_TO_D4DATA, PATH_TO_POWER);

const deps =  { itemTypes, actors, strings, powers };

console.log("Read " + items.size + " items...");
console.log("Read " + itemTypes.size + " item types...");
console.log("Read " + actors.size + " actors...");
console.log("Read " + strings.size + " translations...");
console.log("Read " + emotes.size + " emotes...");
console.log("Read " + portals.size + " portals...");
console.log("Read " + markings.size + " markings...");
console.log("Read " + powers.size + " powers...");

const app = async () => {
    // sync media to strapi server
    const media = await getMediaIndex();
    const files = getTextures(PATH_TO_D4TEXTURES);
    const filesSynced = await syncImages(PATH_TO_D4TEXTURES, files, media);

    // update media list with new uploads
    filesSynced.forEach((v: number, k: string) => {
        media.set(k, v);
    })

    const message = filesSynced.size
        ? filesSynced.size + " files uploaded."
        : "All media up-to-date.";
    console.log(message, {
        num_files: files.length,
        num_media: media.size,
    });

    // await syncItems(items, deps, media);
    // console.log("Items synced.")

    await syncEmotes(emotes, deps, media);
    console.log("Emotes synced.")
}

app().then(() => {
    console.log("Process complete.");
});
