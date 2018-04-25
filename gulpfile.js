// Fresh
// @since v3.0.7
//
// ------------------------------------------------------------------




// ------------------------------------
// Plugins
// ------------------------------------
// General
var g = require('gulp');
var fs = require('fs-extra');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var del = require('del');
var usage = require('gulp-help-doc');
var useref = require('gulp-useref');
// Styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sassLint = require('gulp-sass-lint');
var cssnano = require('gulp-cssnano');
// Scripts
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var beautify = require('gulp-beautify');
// Scipts & Styles
var sourcemaps = require('gulp-sourcemaps');
// Views - Pug
var html2pug = require('gulp-html2pug');
var prettyPug = require('gulp-pug-beautify');
var puglint = require('gulp-pug-lint');
var pug = require('gulp-pug');
// Views - Pug Data
var data = require('gulp-data');
var path = require('path');
var merge = require('gulp-merge-json');
// Views
var htmlmin = require('gulp-htmlmin');
// Images
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
// Tree
var archy = require('archy');
var map = require('gulp-map');
var filetree = require('gulp-filetree');


// ------------------------------------
// Paths -- CONFIGURE THESE
// ------------------------------------
var base = {
	src: './src', // Source Code
	build: './build', // Processed Code for staging/distribution
	buildCss: './build/css',
	buildJs: './build/js'
}


var dependencies = {
	luscious: {
		core: {
			input: './node_modules/luscious-sass',
			output: './dependencies/luscious-sass'
		},
		scaffold: {
			input: './node_modules/luscious-sass/scaffold',
			output: base.src + '/sass'
		}
	},
	"vendors": [{
	// 	// Normalize - CSS
	// 	"input": "./node_modules/normalize.css/normalize.css",
	// 	"output": base.buildCss
	// }, {
	// 	// Font Awesome - CSS
	// 	"input": "./node_modules/font-awesome/css/font-awesome.css",
	// 	"output": base.buildCss
	// }, {
	// 	// Font Awesome - Fonts
	// 	"input": "./node_modules/font-awesome/fonts/**/*",
	// 	"output": base.build + '/fonts'
	// }, {
	// 	// Owl Carousel - CSS
	// 	"input": "./node_modules/owl.carousel/dist/assets/owl.carousel.css",
	// 	"output": base.buildCss
	// }, {
	// 	// Owl Carousel - JS
	// 	"input": "./node_modules/owl.carousel/dist/owl.carousel.js",
	// 	"output": base.buildJs
	// }, {
		// Jquery
		"input": "./node_modules/jquery/dist/jquery.js",
		"output": base.buildJs
	}]
};


var pth = {
	srcD: base.src,
	buildD: base.build,
	styles: {
		input: base.src + '/sass/**/*.{scss,sass}',
		output: base.build + '/css'
	},
	scripts: {
		input: base.src + '/js/**/*.js',
		output: base.build + '/js',
		beautifyOutput: base.src + '/js'
	},
	data: {
		input: base.src + '/views/data/**/*.json',
		output: base.src + '/views',
		fileName: 'data.json',
		file: base.src + '/views/data.json'
	},
	pug: {
		input: base.src + '/views/**/*.pug',
		partials: base.src + '/views/**/_*.pug',
		output: base.build + '/'
	},
	html2pug: {
		input: base.src + '/views/**/*.html',
		output: base.src + '/views/'
	},
	html: {
		buildFiles: base.build + '/**/*.html',
		input: base.src + '/views/**/*.html',
		output: base.build + '/'
	},
	fonts: {
		input: base.src + '/fonts/**/*',
		output: base.build + '/fonts/'
	},
	images: {
		dir: base.src + '/images/',
		inputAll: base.src + '/images/**/*.+(png|jpg|jpeg|gif|svg|ico)',
		input: [
			base.src + '/images/**/*.+(png|jpg|jpeg|gif|svg|ico)',
			'!/**/*(favicon.ico|apple-touch-icon.png)'
		],
		output: base.build + '/images/',
		rootimgsInput: base.src + '/images/**/*(favicon.ico|apple-touch-icon.png)',
		rootimgsOutput: base.build + '/'
	}
}


// ------------------------------------
// Options -- CONFIGURE THESE
// ------------------------------------
var opt = {
	browserSync: {
		// proxy: 'fresh.dev',     // proxy used in local server
		server: pth.buildD + '/', // directory used for localhost source
		open: true, // open a new browser window to localhost port
		injectChanges: true, // inject css changes without reloading browser
		port: 3000, // define the localhost port (default == 3000)
		ui: {
			port: 8080 // Port for configuring browserSync UI options
		},
		tunnel: false // external tunnel (example.tunnel.me).
	}, //browserSync ----------------
	watch: {
		data: pth.data.input,
		views: pth.pug.input,
		styles: pth.styles.input,
		scripts: pth.scripts.input,
		reload: pth.html.output + '**/*.html'
	}, //watch ----------------
	luscious: {
		overwrite: false,
	},
	styles: {
		output: {
			errLogToConsole: true,
			outputStyle: 'expanded',
			sourceComments: 'true',
			indentType: 'tab',
			indentWidth: '1'
		},
		prefixer: [
			'last 2 versions',
			'ie >= 9',
			'and_chr >= 2.3'
		],
		lint: false,
		linterOpts: {
			files: { ignore: '**/*normalize.scss' },
			configFile: './.sass-lint.yml'
		}
	}, //styles ----------------
	scripts: {
		lint: false,
		beautify: { // Options: git.io/vVyYB
			indent_size: 2,
			indent_with_tabs: true
		}
	}, //scripts ----------------
	pug: {
		useData: true,
		lint: true,
		output: {
			pretty: '	',
			basedir: './src/views'
		},
		prettyPug: {
			omit_empty_lines: true,
			fill_tab: true,
			omit_div: true,
			// tab_size: 2   // Only used with 'fill_tab' == false
		}
	}, //pug ----------------
	minifyHtml: {
		collapseWhitespace: true,
		removeComments: true,
		minifyCSS: true,
		minifyJS: true
	},
	images: {
		output: {
			interlaced: true
		}
	} //images ----------------
} //opt



// ------------------------------------------------------------------
// Tasks
// ------------------------------------------------------------------


// ------------------------------------
// Task Runners
// ------------------------------------

/**
 * Runs compile tasks and starts the localhost server
 * @task  {default}
 * @group {Main}
 */
g.task('default', function(callback) {
	runSequence('compile', ['serve'], callback)
});


/**
 * Runs tasks: styles, scripts, pug, images, and fonts
 * @task  {compile}
 * @group {Main}
 */
g.task('compile', [
	'vendors',
	'styles',
	'scripts',
	'pug',
	'images',
	'fonts',
]);


/**
 * Runs tasks: compile, concat, and tree
 * @task  {build}
 * @group {Production}
 */
g.task('build', function(callback) {
	runSequence(
		'clean',
		'compile',
		'concat',
		'minify',
		'tree',
		callback
	)
});



// ------------------------------------
// Get Dependencies
// ------------------------------------


/**
 * Copies Luscious from node_modules and adds it to the project's dependencies.
 * @task  {luscious}
 * @group {Main}
 */
// g.task('luscious', () => {
// 	fs.copy(pth.luscious.core.input, pth.luscious.core.output, {
// 		overwrite: opt.luscious.overwrite,
// 		preserveTimestamps: true
// 	}, err => {
// 		if (err) return console.error(err)
// 	})
// })


/**
 * Copies Luscious-Scaffold to the SASS directory
 * @task  {scaffold}
 * @group {Main}
 */
// g.task('scaffold', () => {
// 	fs.copy(pth.luscious.scaffold.input, pth.luscious.scaffold.output, {
// 		overwrite: false,
// 		preserveTimestamps: true
// 	}, err => {
// 		if (err) return console.error(err)
// 	})
// })


/**
 * Gives user info on initial project setup.
 * @task  {initial:help}
 * @group {Utilities}
 */
g.task('initial:help', () => {
	console.log('If you\'re installing Fresh for the first time with this project and want to use Luscious with your SASS, run `gulp scaffold` to set up some basic SASS files to get you started.')
});



// ------------------------------------
// Individual Tasks
// ------------------------------------

/**
 * Imports dependencies specified in the 'dependencies.vendors' array
 * @task {vendors}
 * @group {Utilities}
 */
g.task('vendors', function() {
	for(var i = 0; i < dependencies.vendors.length; i++) {
		var file = dependencies.vendors[i]
		g.src(file.input)
			.pipe(g.dest(file.output));
	}
});


/**
 * Compiles SASS into CSS |
 * Auto-prefixes based on configs |
 * Creates sourcemaps
 * Options:
 *   Lints SASS,
 *   Outputs CSS style
 * @task  {styles}
 * @group {Main}
 */
g.task('styles', function() {
	return g.src(pth.styles.input)
		.pipe(gulpif(opt.styles.lint, sassLint(opt.styles.linterOpts)))
		.pipe(gulpif(opt.styles.lint, sassLint.format()))
		.pipe(sourcemaps.init())
		.pipe(sass(opt.styles.output).on('error', sass.logError))
		.pipe(prefix(opt.styles.prefixer))
		.pipe(sourcemaps.write({ includeContent: false }))
		.pipe(g.dest(pth.styles.output))
		.pipe(browserSync.reload({ stream: true }));
});


/**
 * Lints SASS even if linting is off in config
 * @task  {styles:lint}
 * @group {Utilities}
 */
g.task('styles:lint', function() {
	return g.src(pth.styles.input)
		.pipe(sassLint(opt.styles.linterOpts))
		.pipe(sassLint.format())
});


/**
 * Copies JS from ./src to ./build |
 * Creates sourcemaps and copies to `./build`
 * Options: Lints JS
 * @task  {scripts}
 * @group {Main}
 */
g.task('scripts', function() {
	return g.src(pth.scripts.input)
		.pipe(gulpif(opt.scripts.lint, jshint()))
		.pipe(gulpif(opt.scripts.lint, jshint.reporter('jshint-stylish-ex')))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write({ includeContent: false }))
		.pipe(g.dest(pth.scripts.output))
		.pipe(browserSync.reload({ stream: true }));
});


/**
 * Lints JS even if linting is off in config
 * @task  {scripts:lint}
 * @group {Utilities}
 */
g.task('scripts:lint', function() {
	return g.src(pth.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish-ex'))
});


/**
 * Makes JS files pretty and readible. Helpful when you
 * need to dig through a file that's been minified
 * @task  {scripts:beautify}
 * @group {Utilities}
 */
g.task('scripts:beautify', function() {
	return g.src(pth.scripts.input)
		.pipe(beautify(opt.scripts.beautify))
		.pipe(g.dest(pth.scripts.beautifyOutput))
});
// REVIEW: May be able to use uglify to replace beautify


/**
 * Compiles Pug into HTML |
 * Options:
 *   Uses data from data.json,
 *   Lints Pug,
 *   Outputs HTML style
 * @task  {pug}
 * @group {Main}
 */
g.task('pug', ['data'], function() {
	return g.src([pth.pug.input, '!' + pth.pug.partials])
		.pipe(gulpif(opt.pug.useData, data(function(file) {
			return JSON.parse(fs.readFileSync(pth.data.file));
		})))
		.pipe(gulpif(opt.pug.lint, puglint()))
		.pipe(pug(opt.pug.output))
		.pipe(g.dest(pth.pug.output));
});


/**
 * Gets data from the json data files and compiles them into data.json to be used by `gulp pug`
 * @task  {data}
 * @group {Main}
 */
g.task('data', function() {
	return g.src(pth.data.input)
		.pipe(merge({
			fileName: pth.data.fileName,
			edit: (json, file) => {
				// Extract the filename and strip the extension
				var filename = path.basename(file.path),
					primaryKey = filename.replace(path.extname(filename), '');
				// Set the filename as the primary key for our JSON data
				var data = {};
				data[primaryKey.toUpperCase()] = json;
				return data;
			}
		}))
		.pipe(g.dest(pth.data.output));
});


/**
 * Lints Pug even if linting is off in config
 * @task  {pug:lint}
 * @group {Utilities}
 */
g.task('pug:lint', function() {
	return g.src([pth.pug.input, pth.pug.partials])
		.pipe(puglint())
});


/**
 * Converts HTML files to Pug
 *  (Run `clean:html` after to remove original files)
 * @task  {html2pug}
 * @group {Utilities}
 */
g.task('html2pug', function() {
	return g.src(pth.html2pug.input)
		.pipe(html2pug())
		.pipe(rename({ dirname: '' }))
		.pipe(prettyPug(opt.pug.prettyPug))
		.pipe(g.dest(pth.html2pug.output));
});


/**
 * Deletes HTML files from ./src
 * @task  {clean:html}
 * @group {Utilities}
 */
g.task('clean:html', function() {
	return del.sync(pth.html.input);
});


/**
 * Copies fonts to from ./src to ./build
 * @task  {fonts}
 * @group {Main}
 */
g.task('fonts', function() {
	return g.src(pth.fonts.input)
		.pipe(g.dest(pth.fonts.output));
});



/**
 * Copies/optimizes/caches images from ./src to ./build directory
 *   (Use 'images:clean:cache' to remove cached files)
 * @task  {images}
 * @group {Main}
 */
g.task('images', function() {
	g.src(pth.images.input)
		.pipe(cache(imagemin(opt.images.output)))
		.pipe(g.dest(pth.images.output));
	g.src(pth.images.rootimgsInput)
		.pipe(cache(imagemin(opt.images.output)))
		.pipe(g.dest(pth.images.rootimgsOutput));
});



/**
 * Deletes ./build directory and clears out the image cache created with `gulp images`
 * @task  {clean}
 * @group {Utilities}
 */
g.task('clean', function(callback) {
	// Clear out image cache
	cache.clearAll()

	// Delete ./build directory
	fs.remove(pth.buildD, err => {
		if (err) return console.error(err)
		callback();
	})
});


/**
 * Starts BrowserSync Server on localhost |
 * Configurable Options:
 *   Open new browser,
 *   Port number,
 *   UI Admin port,
 *   Localtunnel,
 *   Watch files: Default watches pug, sass, and js.
 * @task  {serve}
 * @group {Main}
 */
g.task('serve', function() {
	browserSync.init(opt.browserSync);
	// Watch
	if (opt.watch.styles) { g.watch(opt.watch.styles, ['styles']); }
	if (opt.watch.scripts) { g.watch(opt.watch.scripts, ['scripts']); }
	if (opt.watch.views) { g.watch(opt.watch.views, ['pug']); }
	if (opt.watch.data) { g.watch(opt.watch.data, ['pug']); }
	if (opt.watch.reload) {
		g.watch(opt.watch.reload).on('change', browserSync.reload);
	}
});


/**
 * Prints info about each task to the CLI
 * @task {help}
 * @group {Utilities}
 */
g.task('help', function() { return usage(g); });


/**
 * Prints file tree of the ./build directory to the CLI
 * @task  {tree}
 * @group {Utilities}
 */
g.task('tree', function() {
	var once = true; // lalz0r
	g.src(pth.buildD + '/**')
		.pipe(map(function(file) {
			if (file.path.match(pth.buildD))
				return file
		}))
		.pipe(filetree({ cwdRelative: true }))
		.pipe(map(function(file) {
			if (once) {
				console.log(archy(file.tree));
				once = !once;
			}
			return file;
		}))
});


/**
 * Concats and Minifys CSS & JS
 * @task  {concat}
 * @group {Production}
 */
g.task('concat', function() {
	return g.src(pth.html.buildFiles)
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssnano()))
		.pipe(g.dest(pth.buildD + '/'));
});


/**
 * Minifys HTML. Options: Remove comments, minify inline CSS/JS.
 * @task  {minify}
 * @group {Production}
 */
g.task('minify', function() {
	return g.src(pth.html.buildFiles)
		.pipe(htmlmin(opt.minifyHtml))
		.pipe(g.dest(pth.buildD + '/'));
});
