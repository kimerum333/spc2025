// utils/paths.js
import path from 'path';

export const __dirname = path.resolve();
export const root = (...paths) => path.join(__dirname, ...paths);
