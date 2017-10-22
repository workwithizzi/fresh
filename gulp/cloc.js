// Gulpy v0.0.1
//
// - cloc
// -------------------------------------------------------------------

var g     = require( 'gulp'       );
var shell = require( 'gulp-shell' );

// -------------------------------------------------------------------


/**
 * Prints dev info to the command line for all project files.
 *
 * @task  {cloc}
 * @group {Helper}
 */
g.task('cloc', shell.task([
	'cloc . --exclude-dir=node_modules'
]));



// -------------------------------------------------------------------
// -------------------------------------------------------------------
// 2DO-GULPY: Review gulpy cloc stuff
