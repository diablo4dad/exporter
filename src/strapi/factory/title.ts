import {D4Dependencies, ItemReq} from "../common.js";
import {CLASS_TYPES, D4PlayerTitle, getTextFromStl, resolveStringsList} from "../../d4.js";

export function playerTitleFactory(deps: D4Dependencies, media: Map<string, number>): (item: D4PlayerTitle) => ItemReq {
    return (title: D4PlayerTitle): ItemReq => {
        const playerTitleStringsList = resolveStringsList(title, deps.strings);

        const itemId = title.__snoID__;
        const itemType = title.__fileName__.includes("prefix")
            ? "Player Title (Prefix)"
            : "Player Title (Suffix)";
        const name = getTextFromStl(playerTitleStringsList, "Name");
        const description = getTextFromStl(playerTitleStringsList, "Description"); // always blank
        const iconId = 2613320257; // placeholder, not the proper battle pass icon
        const icon = media.get(iconId + '.webp') ?? null;
        const transMog = false;
        const magicType = "Common";
        const usableByClass = CLASS_TYPES;

        return {
            itemId,
            name,
            description,
            usableByClass,
            icon,
            iconId,
            itemType,
            transMog,
            magicType,
        }
    }
}
