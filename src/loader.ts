import {MAX_HYDRATE_DEPTH_RECURSION, PATH_TO_D4DATA} from "./config.js";

import fs from 'fs';
import path from 'path';

function parseFile<T>(base: string, sub: string, fn: string, depth: number = 0): [string, T] {
    const relativePath = path.join(sub, fn);
    const absolutePath = path.join(base, relativePath);
    const data = fs.readFileSync(absolutePath, 'utf8');
    const json = JSON.parse(data);

    Object.keys(json).forEach((key: string) => {
        const ctx = json[key];

        if (ctx === null) {
            return;
        }
        if (typeof ctx !== "object") {
            return;
        }
        if (depth >= MAX_HYDRATE_DEPTH_RECURSION) {
            return;
        }

        if ('__targetFileName__' in ctx) {
            const targetFileName = ctx['__targetFileName__'] + ".json";
            console.log("Resolving " + targetFileName + "...");
            json[key] = parseFile(base, 'json', targetFileName, depth + 1);
        }
    });

    // sno refs expect a relative path, so index like this
    return [relativePath, json];
}

function parseFiles<T>(sub: string): Map<string, T> {
    const files = fs
        .readdirSync(path.join(PATH_TO_D4DATA, sub))
        .filter((fn: string) => fn.endsWith(".json"))
        .map((fn: string) => {
            return parseFile<T>(PATH_TO_D4DATA, sub, fn);
        });

    return new Map(files);
}

export { parseFiles }
