// Gulpy v0.0.1
//
// Sets up global path vars and requires all the gulp tasks in `./gulp`
// -------------------------------------------------------------------


// Gulp tasks directory
var tasksD = './gulp';

// Gulp config file. Default is setup for using Gulpy from node_modules.
// Remove `../../` from the path if using Gulpy on it's own
var gulpOptions = '../../../gulp.options';

// -------------------------------------


// Set up Global Path Variables
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

// -------------------------------------

// Require All the tasks in tasks directory (defaults to `./gulp`)
var requireDir  = require( 'require-dir' );
requireDir( tasksD );
