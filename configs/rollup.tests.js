
import multiEntry, { entry } from 'rollup-plugin-multi-entry';
import config from './rollup.config';

config.entry = entry;
config.format = 'cjs';
config.dest = 'build/enum.tests.js';
config.external = [ 'tape' ];

config.plugins.push( multiEntry( 'tests/**/*.js' ));

export default config;
