import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default {
  input: 'src/shopping-list-manager-card.js',
  output: {
    file: 'dist/shopping-list-manager-card.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    json(),
    terser()
  ]
};
