import fs from "fs";
import {D4Dependencies, ItemReq} from "./strapi/common.js";
import {itemFactory} from "./strapi/factory/items.js";


type Result = {

}

export function aggregateTransmogsList(deps: D4Dependencies, media: Map<string, number>): ItemReq[] {
    const results = [];
    const makeItem = itemFactory(deps, media);

    for (const d4item of deps.items.values()) {
        const item = makeItem(d4item);
        if (item.transMog) {
            results.push(item);
        }
    }

    return results;
}

export function writeToCsv(results: ItemReq[]) {
    let writeStream = fs.createWriteStream('transmogs.csv')

    const headings = ["Item ID", "Name", "Item Type", "Barbarian", "Druid", "Necromancer", "Rogue", "Sorcerer"];

    writeStream.write(headings.join(',')+ '\n', () => {
        // a line was written to stream
    });

    for (const item of results) {
        const line = [];
        line.push(item.itemId);
        line.push(item.name);
        line.push(item.itemType);
        line.push(item.usableByClass.includes("Barbarian") ? 1 : 0);
        line.push(item.usableByClass.includes("Druid") ? 1 : 0);
        line.push(item.usableByClass.includes("Necromancer") ? 1 : 0);
        line.push(item.usableByClass.includes("Rogue") ? 1 : 0);
        line.push(item.usableByClass.includes("Sorcerer") ? 1 : 0);

        writeStream.write(line.join(',')+ '\n', () => {
            // a line was written to stream
        });
    }

    writeStream.end()

    writeStream.on('finish', () => {
        console.log('finish write stream, moving along')
    }).on('error', (err) => {
        console.log(err)
    })
}
