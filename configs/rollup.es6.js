
import config from './rollup.config';

config.entry = 'src/api.js';
config.format = 'es6';
config.dest = 'dist/enum.js';

export default config;
