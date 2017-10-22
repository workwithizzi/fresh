// Gulpy v0.0.1
//
// - build
// - concat
// - build:message
// - build:test
// -------------------------------------------------------------------

var g           = require( 'gulp'          );
var runSequence = require( 'run-sequence'  );
var useref      = require( 'gulp-useref'   );
var gulpif      = require( 'gulp-if'       );
var uglify      = require( 'gulp-uglify'   );
var cssnano     = require( 'gulp-cssnano'  );
var htmlmin     = require( 'gulp-htmlmin'  );
var download    = require( 'gulp-download' );
var browserSync = require( 'browser-sync'),
		reload      = browserSync.reload;

var op = require(pth.options); // Config

// -------------------------------------------------------------------


/**
 * Runs a combination of tasks to create the production ready site in `./build`.
 * First: `clean`.
 * Second: `images`, `views`, `fonts`, `fonts:build`, `styles`, `styles:normalize`, and `scripts`.
 * Third: `images:build`, `concat`, `tree`, `build:message`.
 *
 * @task  {build}
 * @group {Production}
 * @order {01}
 */
g.task('build', function(callback) {
	runSequence(
		'clean',
		[ 'images',
			'views',
			'fonts',
			'fonts:build',
			'styles',
			'styles:normalize',
			'scripts'
		],
		'images:build',
		'concat',
		'tree',
		'build:message',
		callback
	)
});


/**
 * Concats js and css. If buildType is `static`, then HTML is minified.
 *
 * @task  {concat}
 * @group {Production}
 */
g.task('concat', function() {
	return g.src(pth.stagingD + pth.htmlFiles)
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssnano()))
		.pipe(gulpif(op.isStatic, htmlmin({
			collapseWhitespace: true,
		})))
		.pipe(g.dest(pth.buildD));
});

// -------------------------------------

// Default output message for Static builds
var buildMessage = 'Your STATIC site is ready for production! Check the \'' + pth.buildD + '\' directory for your optimized files. All you have to do now is grab that directory and make it the root folder of your site. If you want to test it out, just run \'gulp build:test\' in your command line.'

if (op.isDynamic){
	var buildMessage = 'Your DYNAMIC template is ready to be converted for your CMS! Check the \'' + pth.buildD + '\' directory for your template-ready files. Your demo content probably won\'t work but if you want to check the other stuff then just run \'gulp build:test\' in your command line.'
}

// Outputs a message to the command line while running the `build` task.
g.task('build:message', function() {
	console.log('');
	console.log(buildMessage);
	console.log('');
});


/**
 * Starts browser-sync server from `./build` to test the production-ready site.
 *
 * @task  {build:test}
 * @group {Production}
 */
g.task('build:test', function() {
	browserSync({
		server: {
			baseDir: pth.buildD
		}
	})
});



// -------------------------------------------------------------------
// -------------------------------------------------------------------
// 2DO-Gulpy: Add gulp-if to pack: tasks
