import { promises as fs } from 'fs';
import { optimize } from 'svgo';
import { setTimeout } from 'timers/promises';

import { API, Format, IElement } from './api';
import { template } from './template';
import { config } from './svgo';

import { getIconsFolderPath, serializeName } from '../utils';

export async function generate({ id, name }: IElement, delay: number): Promise<void> {
    await setTimeout(delay);

    name = serializeName(name);

    const folderPath = getIconsFolderPath(name);
    const isExist = await fs.access(folderPath)
        .then(() => true)
        .catch(() => null);

    if (!isExist) {
        await fs.mkdir(folderPath);
    }

    const api = new API();

    const url = await api.images.get({
        target: process.env.FILE_KEY as string,
        ids: id,
        format: Format.SVG
    })
        .then(({ images }) => images[id]);

    const svg = await api.client.get(url)
        .then(({ data }) => data);
    const { data: optimizedSvg } = optimize(svg, config);

    const jsx = template(name);

    await Promise.all([
        fs.writeFile(getIconsFolderPath(name, 'index.svg'), optimizedSvg, {
            encoding: 'utf-8'
        }),
        fs.writeFile(getIconsFolderPath(name, 'index.tsx'), jsx, {
            encoding: 'utf-8'
        })
    ]);

    console.log(`${name} was written success!`);
}