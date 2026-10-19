import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';

const vite = resolve('node_modules/vite/bin/vite.js');
execFileSync(process.execPath, [vite, 'build'], { stdio: 'inherit' });

// The hosted Worker serves the same Vite build used by Vercel.
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };
const assets = {};
for (const entry of readdirSync('dist', { recursive: true, withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const path = resolve(entry.parentPath, entry.name);
  const extension = entry.name.slice(entry.name.lastIndexOf('.'));
  assets['/' + relative('dist', path).split(sep).join('/')] = { body: readFileSync(path).toString('base64'), type: types[extension] || 'application/octet-stream' };
}
mkdirSync('.generated', { recursive: true });
writeFileSync('.generated/assets.js', `export default ${JSON.stringify(assets)};\n`);
execFileSync(process.execPath, [vite, 'build', '--config', 'vite.worker.config.js'], { stdio: 'inherit' });
if (existsSync('.openai/hosting.json')) {
  mkdirSync('dist/.openai', { recursive: true });
  writeFileSync('dist/.openai/hosting.json', readFileSync('.openai/hosting.json'));
}
