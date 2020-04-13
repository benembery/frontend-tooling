import dynamicImportPolyfill from 'dynamic-import-polyfill';
import a from './moduleA';
dynamicImportPolyfill.initialize();

a();