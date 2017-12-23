// Gulpy
// @since v0.0.3
//
// 1. Plugins
// 2. Get tasks from tasks directory
// 3. Project Paths
// 4. Project Options
// ------------------------------------------------------------------


// ------------------------------------
// 1. Plugins
// ------------------------------------
var g            = require( 'gulp'              );
var runSequence  = require( 'run-sequence'      );
var requireDir   = require( 'require-dir'       );


// ------------------------------------
// 2. Get tasks from tasks directory
// ------------------------------------
// Point this path to the location of the gulp tasks directory
requireDir( './dependencies/gulpy' );


// ------------------------------------------------------------------
// ------------------------------------------------------------------
// TEMP: Use this until Gulp variables are finished updating
// Gulp config file. Default is setup for using Gulpy from node_modules.
// Remove `../../` from the path if using Gulpy on it's own
var gulpOptions = '../../../../../gulp.options';
// ------------------------------------------------------------------
// ------------------------------------------------------------------


// ------------------------------------
// 3. Project Paths
// ------------------------------------
// TEMP: Use this global var until all the old ones are converted
global.nwPth = {
	serveFrom:   './staging'



}; //paths

global.pth = {
	options:  gulpOptions,

	allFiles: '/**/*',       // Generic glob all files
	ignore:  '/*@@*',        // Global ingore for files/dirs

	// Root level directories
	devD:     './dev',
	stagingD: './staging',
	buildD:   './build',
	serverD:   './staging',   // BrowserSync will load from here.

	// Sublevel paths ------ //

	// Views: pug/html/data
	viewsD:       '/views',
	pugFiles:     '/**/*.pug',
	pugPartials:  '**/_*.pug',
	htmlFiles:    '/**/*.html',
	dataFiles:    '/**/*.json',

	// Scripts: js
	scriptsD:     '/scripts',
	scriptsFiles: '/**/*.js',
	scriptsMain:  '/main.js',
	scriptsVendD: '/vendors',
	scriptsDestD: '/js',

	// Styles: sass/scss/css
	stylesD:        '/styles',
	stylesFiles:    '/**/*.+(sass|scss)',
	stylesPartials: '**/_*.+(sass|scss)',
	stylesMain:     '/main.+(sass|scss)',
	sassLintConf:   './.sass-lint.yml',
	stylesDestD:    '/css',
	cssFiles:       '/*.css',

	// Assets
	imagesD:      '/images',
	imagesRootD:  '/rootimg',
	imagesAll:    '/**/*.+(png|jpg|jpeg|gif|svg|ico)',
	fontsD:       '/fonts',
};
