import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import globals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'

const pkg = require('./package.json')

export default {
  input: `src/index.ts`,
  output: [
    { file: "lib/bundle.umd.js", name: 'svLib', format: 'umd', sourcemap: true },
    { file: "lib/bundle.es5.js", format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    globals(),
    builtins({}),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({ jsnext: true, preferBuiltins: false }),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
