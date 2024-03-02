import {issueGet, issuePostForm, StrapiMediaItem} from "./common.js";
import fs from "fs";
import path from "path";
import {partition} from "../helper.js";
import {PATH_TO_D4TEXTURES} from "../config.js";

type MediaLookup = Map<string, number>;

async function getMediaIndex(): Promise<Map<string, number>> {
    const resp = await issueGet('/api/upload/files');
    const data = await resp.json() as StrapiMediaItem[];
    if (!resp.ok) {
        console.log("Error syncing images...", {
            status_code: resp.status,
            data: data,
        });

        return new Map();
    }

    return new Map(
        data.map(m => [m.name, m.id]),
    );
}

async function uploadImages(imagesToUpload: string[]): Promise<StrapiMediaItem[]> {
    const form = imagesToUpload.reduce((form, img) => {
        const buffer = fs.readFileSync(img);
        const blob = new Blob([buffer], {type: 'image/webp'});
        form.append("files", blob, img);
        return form;
    }, new FormData());

    const resp = await issuePostForm('/api/upload', form);
    if (!resp.ok) {
        console.log("Error uploading images...", {
            status_code: resp.status,
            data: await resp.text(),
        });

        return [];
    }

    const data = await resp.json() as StrapiMediaItem[];

    console.log("Uploaded images...", data.map(media => media.name));

    return data;
}

export function uploadImage(media: Map<string, number>): (iconId: number) => Promise<StrapiMediaItem | null> {
    return async (iconId: number) => {
        if (media.has(iconId + '.webp')) {
            console.warn('Icon ' + iconId + ' already exists in media.');
            return null;
        }

        const filename = path.join(PATH_TO_D4TEXTURES, iconId + '.webp');
        try {
            fs.accessSync(filename, fs.constants.R_OK);
        } catch (err) {
            console.warn('Unable to read file ' + filename + '...');
            return null;
        }

        const resp = await uploadImages([filename]);
        if (resp.length) {
            const mediaUpload = resp[0];
            media.set(mediaUpload.name, mediaUpload.id);
            return mediaUpload;
        }

        return null;
    }
}

async function syncImages(pathToImages: string, imagesToSync: string[], existingMedia: Map<string, number>): Promise<Map<string, number>> {
    // filter out images that already exist
    const imagesToUpload =
        imagesToSync
            .map(img => path.basename(img))
            .filter(img => !existingMedia.has(img))
            .map(img => path.join(pathToImages, img));

    // batch uploads into
    const uploadBatches =
        partition(imagesToUpload, 100)
            .map(uploadImages);

    // execute each upload
    const results =
        await Promise.all(uploadBatches);

    // convert to value pairs [filename, iconHandle]
    return new Map(
        results.flatMap(e => e.map(i => [i.name, i.id]))
    );
}

export {syncImages, getMediaIndex};
export type { MediaLookup }
