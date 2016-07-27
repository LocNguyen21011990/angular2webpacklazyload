/** Tell karma which file to load */

Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('ts-helpers');
require('rxjs/Rx');

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

const appContext = require.context('./src', true, /\.spec\.ts/);
appContext.keys().forEach(appContext);
testing.setBaseTestProviders(
  browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);
