// Gulpy v0.0.1
//
// - gitio
// -------------------------------------------------------------------

var g     = require('gulp'        );
var shell = require( 'gulp-shell' );

// -------------------------------------------------------------------


/**
 * Accepts a github url and outputs a shortened git.io url.
 *
 * @task  {gitio}
 * @group {Helper}
 */
g.task('gitio', shell.task([
	'. ./gulp/shell/gitio.sh'
]));
