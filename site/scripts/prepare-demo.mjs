// Copies the built card and the Material Design Icons font into the demo folder,
// and writes the current version so the site can show it.
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, '..');
const root = resolve(site, '..');
const demo = resolve(site, 'public/sandbox');

const card = resolve(root, 'dist/shopping-list-manager-card.js');
if (!existsSync(card)) {
  console.error('dist/shopping-list-manager-card.js is missing. Run "npm run build" in the card repo first.');
  process.exit(1);
}
cpSync(card, resolve(demo, 'shopping-list-manager-card.js'));

// Material Design Icons: the font plus a name -> character map (the card asks for icons by name)
const mdi = resolve(site, 'node_modules/@mdi/font');
mkdirSync(resolve(demo, 'mdi'), { recursive: true });
cpSync(resolve(mdi, 'fonts/materialdesignicons-webfont.woff2'), resolve(demo, 'mdi/mdi.woff2'));
const css = readFileSync(resolve(mdi, 'css/materialdesignicons.css'), 'utf8');
const map = {};
for (const m of css.matchAll(/\.mdi-([a-z0-9-]+)::before\s*{\s*content:\s*"\\([0-9A-Fa-f]+)"/g)) {
  map[m[1]] = parseInt(m[2], 16);
}
writeFileSync(resolve(demo, 'mdi/icons.json'), JSON.stringify(map));

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
writeFileSync(resolve(site, 'public/version.json'), JSON.stringify({ version: pkg.version }));
console.log(`demo ready: card ${pkg.version}, ${Object.keys(map).length} icons`);
