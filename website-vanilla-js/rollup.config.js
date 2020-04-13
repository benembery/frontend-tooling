import commonJs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import { terser } from 'rollup-plugin-terser';

const __outputDir = './dist/js'

export default {
    input: './assets/main.js',
    output: [
        {
            dir: `${__outputDir}/es/`,
            format: 'esm',
            entryFileNames: '[name].[hash].mjs',
            sourcemap: true,
            dynamicImportFunction: '__import__'
        },
        {
            dir: `${__outputDir}/sys/`,
            format: 'system',
            sourcemap: true,
        },


    ],
    plugins: [
        resolve(),
        commonJs(),
        terser(),
    ],
    manualChunks(id) {
        if (!id.includes('node_modules'))
            return;

        const dirs = id.split(path.sep);
        const pkgOrScope = dirs[dirs.lastIndexOf('node_modules') + 1];

        if(['webfontloader', 'dynamic-import-polyfill'].indexOf(pkgOrScope) > -1)
            return 'core'

        return pkgOrScope
    }
};