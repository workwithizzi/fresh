// Gulpy v0.0.1
//
// - styles
// - styles:normalize
// - styles:lint
// - styles:tabify
// - styles:test
// -------------------------------------------------------------------
// 2DO-FRESH: Add downloader for .sass-lint.yml to file

var g           = require( 'gulp'             );
var gulpif      = require( 'gulp-if'          );
var sass        = require( 'gulp-sass'        );
var prefix      = require( 'gulp-autoprefixer');
var sourcemaps  = require( 'gulp-sourcemaps'  );
var sassLint    = require( 'gulp-sass-lint'   );
var tabify      = require( 'gulp-tabify'      );
var parker      = require( 'gulp-parker'      );
var browserSync = require( 'browser-sync'     ),
		reload      = browserSync.reload;

var op = require(pth.options); // Config

// -------------------------------------------------------------------

// 2DO-GULPY: Move sass options/prefixer/linter to gulp.options
// Output Options
var sassOpts = {
	errLogToConsole: true,
	outputStyle: 'expanded',
	sourceComments: 'true',
	indentType: 'tab',
	indentWidth: '1',
};

// Autoprefixer Options
var prefixOpts = [
	'last 2 versions',
	'ie >= 9',
	'and_chr >= 2.3'
];

// Linter Options
var lintOpts = {
	files: { ignore: op.sassLintX },
	configFile: pth.sassLintConf,
};


/**
 * Compiles SASS in `./dev/styles` to CSS in `./staging/styles`. Creates sourcemaps, auto-prefixes, optionally lints, and reloads browser.
 *
 * @task  {styles}
 * @group {Development}
 */
g.task('styles', function() {
	return g.src([
		pth.devD + pth.stylesD + pth.stylesFiles,
		'!' + pth.devD + pth.stylesD + pth.ignore + '.+(sass|scss)'
		])
		.pipe(gulpif(op.lintSass, sassLint( lintOpts )))
		.pipe(gulpif(op.lintSass, sassLint.format()))
		.pipe(sourcemaps.init())
			.pipe(sass( sassOpts ).on('error', sass.logError))
			.pipe(prefix( prefixOpts ))
		.pipe(sourcemaps.write())
		.pipe(g.dest(pth.stagingD + pth.stylesDestD))
		.pipe(reload({ stream:true }));
});


/**
 * Copies normalize from `./node_modules` to `./staging/styles`.
 *
 * @task  {styles:normalize}
 * @group {Development}
 */
g.task('styles:normalize', function() {
	return g.src('node_modules/normalize.css/normalize.css')
		.pipe(g.dest(pth.stagingD + pth.stylesDestD))
		.pipe(reload({stream:true}));
});


/**
 * Lints SASS even if linting is not turned on in config.
 *
 * @task  {styles:lint}
 * @group {Development}
 */
g.task('styles:lint', function() {
	return g.src(pth.devD + pth.stylesD + pth.stylesFiles)
		.pipe(sassLint( lintOpts ))
		.pipe(sassLint.format())
});


/**
 * Converts tabs to spaces on all SASS files.
 *
 * @task  {styles:tabify}
 * @group {Development}
 */
g.task('styles:tabify', function() {
	return g.src(pth.devD + pth.stylesD + pth.stylesFiles)
		.pipe(tabify( 2, true ))
		.pipe(g.dest(pth.devD + pth.stylesD))
});


/**
 * Prints info about production CSS to CLI.
 *
 * @task  {styles:test}
 * @group {Helper}
 */
g.task('styles:test', function() {
	g.src(pth.buildD + pth.stylesDestD + pth.cssFiles)
		.pipe(parker())
});
