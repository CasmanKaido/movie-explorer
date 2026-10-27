// Import { execFileSync } from node:child_process.
import { execFileSync } from 'node:child_process';
// Import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from node:fs.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
// Import { resolve, relative, sep } from node:path.
import { resolve, relative, sep } from 'node:path';

// Locate the installed Vite build command.
const vite = resolve('node_modules/vite/bin/vite.js');
// Run execFileSync(process.execPath, [vite, 'build'], { stdio: 'inherit' }).
execFileSync(process.execPath, [vite, 'build'], { stdio: 'inherit' });

// The hosted Worker serves the same Vite build used by Vercel.
// Map built file extensions to their HTTP content types.
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };
// Collect the built assets for the hosted Worker.
const assets = {};
// Process each entry in the collection.
for (const entry of readdirSync('dist', { recursive: true, withFileTypes: true })) {
  // Check !entry.isFile() before running this branch.
  if (!entry.isFile()) continue;
  // Prepare path for the steps below.
  const path = resolve(entry.parentPath, entry.name);
  // Prepare extension for the steps below.
  const extension = entry.name.slice(entry.name.lastIndexOf('.'));
  // Run assets['/' + relative('dist', path).split(sep).join('/')] = { body: readFileSync(path).toString('base64'), typ.
  assets['/' + relative('dist', path).split(sep).join('/')] = { body: readFileSync(path).toString('base64'), type: types[extension] || 'application/octet-stream' };
}
// Run mkdirSync('.generated', { recursive: true }).
mkdirSync('.generated', { recursive: true });
// Run writeFileSync('.generated/assets.js', `export default ${JSON.stringify(assets)};\n`).
writeFileSync('.generated/assets.js', `export default ${JSON.stringify(assets)};\n`);
// Run execFileSync(process.execPath, [vite, 'build', '--config', 'vite.worker.config.js'], { stdio: 'inherit' }).
execFileSync(process.execPath, [vite, 'build', '--config', 'vite.worker.config.js'], { stdio: 'inherit' });
// Check existsSync('.openai/hosting.json') before running this branch.
if (existsSync('.openai/hosting.json')) {
  // Run mkdirSync('dist/.openai', { recursive: true }).
  mkdirSync('dist/.openai', { recursive: true });
  // Run writeFileSync('dist/.openai/hosting.json', readFileSync('.openai/hosting.json')).
  writeFileSync('dist/.openai/hosting.json', readFileSync('.openai/hosting.json'));
}
