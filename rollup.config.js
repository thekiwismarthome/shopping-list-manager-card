import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));

function injectVersion() {
  const id = 'virtual:card-version';
  return {
    name: 'inject-version',
    resolveId(src) { return src === id ? id : null; },
    load(id_) { return id_ === id ? `export const CARD_VERSION = '${version}';` : null; },
  };
}

export default {
  input: 'src/shopping-list-manager-card.js',
  output: {
    file: 'dist/shopping-list-manager-card.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    injectVersion(),
    resolve(),
    commonjs(),
    terser()
  ]
};
