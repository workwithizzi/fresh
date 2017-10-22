// Gulpy v0.0.1
//
// - scripts
// - scripts:lint
// - scripts:tabify
// -------------------------------------------------------------------

// Plugins
var g           = require( 'gulp'            );
var gulpif      = require( 'gulp-if'         );
var tabify      = require( 'gulp-tabify'     );
var jshint      = require( 'gulp-jshint'     );
var sourcemaps  = require( 'gulp-sourcemaps' );
var fixmyjs     = require( 'gulp-fixmyjs'    );
var browserSync = require( 'browser-sync'    ),
		reload      = browserSync.reload;

var op = require(pth.options); // Config

// -------------------------------------------------------------------


/**
 * Copies .js files from `./dev/scripts` to `./staging/scripts` while (optionally) linting, creating sources maps, and triggering browser refresh.
 *
 * @task  {scripts}
 * @group {Development}
 */
g.task('scripts', function() {
	return g.src(pth.devD + pth.scriptsD + pth.scriptsFiles)
		.pipe(g.dest( pth.devD + pth.scriptsD))
		// 2DO-GULPY: Get fixmyjs working
		.pipe(gulpif(op.fixJs, fixmyjs()))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish-ex'))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(g.dest(pth.stagingD + pth.scriptsDestD))
		.pipe(reload({stream:true}));
});


/**
 * Lints js even if linting is not turned on in config.
 *
 * @task  {scripts:lint}
 * @group {Development}
 */
g.task('scripts:lint', function() {
	return g.src(pth.devD + pth.scriptsD + pth.scriptsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish-ex'))
});


/**
 * Converts spaces to tabs on all js files.
 *
 * @task  {scripts:tabify}
 * @group {Development}
 */
g.task('scripts:tabify', function() {
	return g.src(pth.devD + pth.scriptsD + pth.scriptsFiles)
		.pipe(tabify( 2, true ))
		.pipe(g.dest(pth.devD + pth.scriptsD))
});
