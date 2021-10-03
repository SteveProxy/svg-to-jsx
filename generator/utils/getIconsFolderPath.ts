import path from 'path';

import { ICONS_DIRECTORY } from './constants';

export function getIconsFolderPath(...subpath: string[]): string {
    if (subpath.length) {
        return path.resolve(ICONS_DIRECTORY, ...subpath);
    }

    return path.resolve(ICONS_DIRECTORY);
}