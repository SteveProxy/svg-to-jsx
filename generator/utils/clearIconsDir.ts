import { exec } from 'child_process';

import { ICONS_DIRECTORY } from './constants';

export function clearIconsDir(): void {
    exec(`rm -rf ${ICONS_DIRECTORY} -v !(Icon.jsx) !(Icon.css)`);
}