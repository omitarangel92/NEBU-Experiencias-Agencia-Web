import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = process.cwd();
const server = await createServer({
  mode: 'production',
  configFile: path.resolve(root, 'vite.config.js'),
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false },
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const markup = renderToString(React.createElement(App));
  const indexPath = path.resolve(root, 'dist', 'index.html');
  const html = await readFile(indexPath, 'utf8');
  const rootElement = '<div id="root"></div>';
  if (!html.includes(rootElement)) throw new Error('Could not find the application root in dist/index.html.');
  await writeFile(indexPath, html.replace(rootElement, `<div id="root">${markup}</div>`));
} finally {
  await server.close();
}
