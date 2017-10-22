// Gulpy v0.0.2
//
// - server
// - watch
// - default
// -------------------------------------------------------------------

var g           = require( 'gulp'         );
var runSequence = require( 'run-sequence' );
var browserSync = require( 'browser-sync' ),
		reload      = browserSync.reload;

var op = require(pth.options); // Config

// -------------------------------------------------------------------



/**
 * Starts your local server using browserSync with `./staging/index.html` as the entry point, opens up port '8080' to fine-tune your browserSync config, and optionally opens up a tunnel for remote viewing of the local site.
 *
 * @task  {server}
 * @group {Development}
 */
g.task('server', function() {
	browserSync({
		server: {
			baseDir: pth.serverD // Serve files from here
		},
		ui: {
			port: 8080  // Port for configuring browserSync
		},
		tunnel: op.tunnel // External Tunnel
	})
});


/**
 * Watches files for changes/updates and reloads the browser when triggered. Watch-files are: pug/html, sass/scss, and js.
 *
 * @task  {watch}
 * @group {Development}
 */
g.task('watch', function() {
	g.watch(pth.devD + pth.viewsD + pth.allFiles, ['views'] );
	g.watch(pth.devD + pth.stylesFiles, ['styles'] );
	g.watch(pth.devD + pth.scriptsFiles, ['scripts'] );
	g.watch(pth.serverD + pth.htmlFiles, reload );
});


/**
 * Runs a combination of tasks to create your main development workflow.
 * First:  `images` and `views`
 * Second: `fonts`, `styles`, `styles:normalize`, `scripts`, `server`
 * Third:  `watch`
 *
 * @task  {default}
 * @group {Development}
 * @order {01}
 */
g.task('default', function(callback) {
	runSequence('images', 'views',
	['fonts', 'styles', 'styles:normalize', 'scripts', 'server'],
	'watch', callback )
});



// -------------------------------------------------------------------
// -------------------------------------------------------------------
// 2DO-GULPY: See if there is a way to not create a new browser tab everytime gulpy runs
// 2DO-GULPY: Look into using something like 'gulp-if' to make sure the local staging site doesn't have code removed if the build type is set for 'cms'.
