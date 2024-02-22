import fs from 'fs';

function getTextures(base: string): string[] {
    return fs.readdirSync(base);
}

export { getTextures };
