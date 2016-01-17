
import config from './rollup.config';

config.entry = 'src/api.es5.js';
config.format = 'umd';
config.dest = 'dist/enum.umd.js';

export default config;
