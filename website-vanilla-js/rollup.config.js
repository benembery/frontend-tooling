import commonJs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import { terser } from 'rollup-plugin-terser';

const __outputDir = './dist/js'

const plugins = [
    resolve(),
    commonJs(),
    terser(),
];

export default [
    {
        input: './assets/main-module.js',
        output: {
            dir: `${__outputDir}/`,
            format: 'esm',
            entryFileNames: '[name].[hash].mjs',
            chunkFileNames: '[name].[hash].mjs',
            sourcemap: true,
            dynamicImportFunction: '__import__'
        },
        plugins,
        manualChunks(id) {
            if (!id.includes('node_modules'))
                return;

            const dirs = id.split(path.sep);
            const pkgOrScope = dirs[dirs.lastIndexOf('node_modules') + 1];

            if (['webfontloader', 'dynamic-import-polyfill'].includes(pkgOrScope))
                return 'core'

            return pkgOrScope
        }
    },
    {
        input: './assets/main-nomodule.js',
        inlineDynamicImports: true,
        plugins,
        output: {
            dir: `${__outputDir}/nomod/`,
            format: 'iife',
            entryFileNames: '[name]-[hash].js',
        }
    }
]