import { initialize } from 'dynamic-import-polyfill';
import main from './main';
initialize({ modulePath: '/' });

main();