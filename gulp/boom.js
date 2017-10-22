// Gulpy v0.0.1
//
// - boom : Plays an audio clip for funsies
// -------------------------------------------------------------------

var g     = require( 'gulp'       );
var shell = require( 'gulp-shell' );

// -------------------------------------------------------------------


/**
 * Plays audio clip. Because, why not?
 *
 * @task  {boom}
 */
g.task('boom', shell.task([ 'afplay gulp/__rsc__/boom.m4a' ]));
