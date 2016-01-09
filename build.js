'use strict';

var
  configs,
  _package = require( './package.json' ),
  chalk = require( 'chalk' ),
  util = require( 'util' ),
  rollup = require( 'rollup' ),
  babel = require( 'rollup-plugin-babel' );

// combine "config.common" with each config of config.builds
configs = _package.config.builds.map( build => Object.assign({}, _package.config.common, build ));

util.log( chalk.cyan( 'Starting up rollup builds' ));
Promise.all(
  configs.map(function( config ) {
    util.log( chalk.yellow( `starting ${config.format} bundle` ));
    return rollup.rollup({
      entry: config.entry,
      plugins: [
        babel()
      ]
//      external: [ '' ],
//      onwarn: () => {},
    })
      .then(function( bundle ) {
        util.log( chalk.blue( `writing ${config.format} bundle`));
        return bundle.write({
          dest: config.dest,
          format: config.format,
          exports: config.exports,
          moduleId: _package.name,
          moduleName: config.moduleName,
          sourceMap: config.sourceMap
//          sourceMap: 'inline' || true
//          globals: {
//            id: 'name on global'
//          },
//          indent: false || true,
//          banner: '/* hello world */',
//          footer: '/* goodbye world */',
//          intro: '',
//          outro: '',
//          useStrict: true || false,
        });
      })
      .then(function() { util.log( chalk.green( `${config.format} done` )); });
  }))
  .then(function() { util.log( chalk.cyan( 'rollup builds done' )); })
  .catch(function( error ) {
    util.log( chalk.red( 'error with rollup build' ));
    console.error( error.stack );
  });
