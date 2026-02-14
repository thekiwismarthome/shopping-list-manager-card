import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/shopping-list-manager-card.js',
  output: {
    file: 'dist/shopping-list-manager-card.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ]
};
