import {D4Actor, D4Item, D4ItemType, D4Translation} from "./d4";
import {parseFiles} from "./loader";
import {PATH_TO_D4ACTOR, PATH_TO_D4DATA, PATH_TO_D4ITEM, PATH_TO_D4ITEM_TYPE, PATH_TO_D4STRING_LIST} from "./config";

const items = parseFiles<D4Item>(PATH_TO_D4DATA, PATH_TO_D4ITEM);
const itemTypes = parseFiles<D4ItemType>(PATH_TO_D4DATA, PATH_TO_D4ITEM_TYPE);
const actors = parseFiles<D4Actor>(PATH_TO_D4DATA, PATH_TO_D4ACTOR);
const strings = parseFiles<D4Translation>(PATH_TO_D4DATA, PATH_TO_D4STRING_LIST);

console.log("Read " + items.size + " items...");
console.log("Read " + itemTypes.size + " item types...");
console.log("Read " + actors.size + " actors...");
console.log("Read " + strings.size + " translations...");
