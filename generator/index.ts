import { promises as fs } from 'fs';
import dotenv from 'dotenv';

import { API, generate } from './modules';
import { clearIconsDir, getIconsFolderPath, serializeName } from './utils';

dotenv.config();

clearIconsDir();

const api = new API();

const { nodes } = await api.files.nodes({
  target: process.env.FILE_KEY as string,
  ids: process.env.FRAME_WITH_ICONS_ID as string
});

const { document: { children } } = nodes[process.env.FRAME_WITH_ICONS_ID as string];

// Generate components
await Promise.all(
    children.map((icon, index) => generate(icon, index * 2_000))
);

// Generate exports
const exports = children.map(({ name }) => (
    `export * from './${serializeName(name)}';`
))
    .join('\n');

await fs.writeFile(getIconsFolderPath('index.ts'), exports, {
  encoding: 'utf-8'
});
