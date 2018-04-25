// Fresh
// @since v3.0.7
// ------------------------------------------------------------------


var src = './src',
		srcViews = src + '/views'
		build = './build',
		buildCss = build + '/css',
		buildJs = build + '/js'

		styles = {
			input: src + '/sass/**/*.{scss,sass}',
			output: buildCss
		},

		scripts = {
			input: src + '/js/**/*.js',
			output: buildJs,
			beautifyOutput: src + '/js'
		},

		viewsPug = {
			input: src + '/views/**/*.pug',
			partials: src + '/views/**/_*.pug',
			output: build,
			convertedHtml: src + '/views/original-html'
		},

		db = {
			input: src + '/views/data/**/*.json',
			output: src + '/views',
			fileName: 'data.json',
			file: src + '/views/data.json'
		},

		html = {
			buildFiles: build + '/**/*.html',
			input: src + '/views/**/*.html',
			output: build
		},

		fonts = {
			input: src + '/fonts/**/*',
			output: build + '/fonts'
		},

		images = {
			site: {
				input: [
					src + '/images/**/*.+(png|jpg|jpeg|gif|svg|ico)',
					'!/**/*(favicon.ico|apple-touch-icon.png)'
				],
				output: build + '/images'
			},
			root: {
				input: src + '/images/**/*(favicon.ico|apple-touch-icon.png)',
				output: build
			}
		};



// ------------------------------------
// Options - CONFIGURE
// ------------------------------------
var opt = {
	// browserSync ----------------
	browserSync: {
		// proxy: 'fresh.dev',     // proxy used in local server
		server: build + '/', // directory used for localhost source
		open: false, // open a new browser window to localhost port
		injectChanges: true, // inject css changes without reloading browser
		notify: false, // don't show notifications in browser
		port: 3000, // define the localhost port (default == 3000)
		ui: {
			port: 8080 // Port for configuring browserSync UI options
		},
		tunnel: false // external tunnel (example.tunnel.me).
	},
	openfile: [
		build + '/index.html'
	],
	// watch files ----------------
	watch: {
		data: db.input,
		views: viewsPug.input,
		styles: styles.input,
		scripts: scripts.input,
		reload: html.buildFiles
	},
	luscious: {
		overwrite: false,
	},
	// styles ----------------
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
	},
	// scripts ----------------
	scripts: {
		lint: false,
		beautify: { // Options: git.io/vVyYB
			indent_size: 2,
			indent_with_tabs: true
		}
	},
	// pug ----------------
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
	},
	minifyHtml: {
		collapseWhitespace: true,
		removeComments: true,
		minifyCSS: true,
		minifyJS: true
	},
	// images ----------------
	images: {
		output: {
			interlaced: true
		}
	}
}


// ------------------------------------
// Project Dependencies - CONFIGURE
// ------------------------------------
var dependencies = {
	luscious: {
		core: {
			input: './node_modules/luscious-sass',
			output: './dependencies/luscious-sass'
		},
		scaffold: {
			input: './node_modules/luscious-sass/scaffold',
			output: src + '/sass'
		}
	},
	"vendors": [{
	// 	// Normalize - CSS
	// 	"input": "./node_modules/normalize.css/normalize.css",
	// 	"output": buildCss
	// }, {
	// 	// Font Awesome - CSS
	// 	"input": "./node_modules/font-awesome/css/font-awesome.css",
	// 	"output": buildCss
	// }, {
	// 	// Font Awesome - Fonts
	// 	"input": "./node_modules/font-awesome/fonts/**/*",
	// 	"output": build + '/fonts'
	// }, {
	// 	// Owl Carousel - CSS
	// 	"input": "./node_modules/owl.carousel/dist/assets/owl.carousel.css",
	// 	"output": buildCss
	// }, {
	// 	// Owl Carousel - JS
	// 	"input": "./node_modules/owl.carousel/dist/owl.carousel.js",
	// 	"output": buildJs
	// }, {
		// Jquery
		"input": "./node_modules/jquery/dist/jquery.js",
		"output": buildJs
	}]
};


// ------------------------------------
// Plugins
// ------------------------------------
var g = require('gulp');
		sass = require('gulp-sass'),
		prefix = require('gulp-autoprefixer'),
		sassLint = require('gulp-sass-lint'),
		cssnano = require('gulp-cssnano'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		beautify = require('gulp-beautify'),
		sourcemaps = require('gulp-sourcemaps'),
		htmlmin = require('gulp-htmlmin'),
		html2pug = require('gulp-html2pug'),
		prettyPug = require('gulp-pug-beautify'),
		puglint = require('gulp-pug-lint'),
		pug = require('gulp-pug'),
		data = require('gulp-data'),
		path = require('path'),
		merge = require('gulp-merge-json'),
		imagemin = require('gulp-imagemin'),
		cache = require('gulp-cache'),
		fs = require('fs-extra'),
		useref = require('gulp-useref'),
		gulpif = require('gulp-if'),
		browserSync = require('browser-sync'),
		runSequence = require('run-sequence'),
		rename = require('gulp-rename'),
		del = require('del'),
		usage = require('gulp-help-doc'),
		open = require('gulp-open'),
		// Tree
		archy = require('archy'),
		map = require('gulp-map'),
		filetree = require('gulp-filetree');



// ------------------------------------------------------------------
// Tasks
// ------------------------------------------------------------------

/**
 * Runs compile tasks and starts the localhost server
 * @task  {default}
 * @group {Main}
 */
g.task('default', function(callback) {
	runSequence('compile', ['serve'], callback)
});

// Alias Task
g.task('d', ['default']);


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
g.task('luscious', () => {
	fs.copy(dependencies.luscious.core.input, dependencies.luscious.core.output, {
		overwrite: opt.luscious.overwrite,
		preserveTimestamps: true
	}, err => {
		if (err) return console.error(err)
	})
})


/**
 * Copies Luscious-Scaffold to the SASS directory
 * @task  {scaffold}
 * @group {Main}
 */
g.task('scaffold', () => {
	fs.copy(dependencies.luscious.scaffold.input, dependencies.luscious.scaffold.output, {
		overwrite: false,
		preserveTimestamps: true
	}, err => {
		if (err) return console.error(err)
	})
})


/**
 * Gives user info on initial project setup.
 * @task  {initial:help}
 * @group {Utilities}
 */
g.task('initial:help', () => {
	console.log('If you\'re installing Fresh for the first time with this project and want to use Luscious with your SASS, run `gulp scaffold` to set up some basic SASS files to get you started.')
});



// ------------------------------------
// Styles
// ------------------------------------
/**
 * Compiles SASS into CSS, auto-prefixes, creates sourcemaps, lints
 * @task  {styles}
 * @group {Main}
 */
g.task('styles', function() {
	return g.src(styles.input)
		.pipe(gulpif(opt.styles.lint, sassLint(opt.styles.linterOpts)))
		.pipe(gulpif(opt.styles.lint, sassLint.format()))
		.pipe(sourcemaps.init())
		.pipe(sass(opt.styles.output).on('error', sass.logError))
		.pipe(prefix(opt.styles.prefixer))
		.pipe(sourcemaps.write({ includeContent: false }))
		.pipe(g.dest(styles.output))
		.pipe(browserSync.reload({ stream: true }));
});


/**
 * Lints SASS even if linting is off in config
 * @task  {styles:lint}
 * @group {Utilities}
 */
g.task('styles:lint', function() {
	return g.src(styles.input)
		.pipe(sassLint(opt.styles.linterOpts))
		.pipe(sassLint.format())
});


// ------------------------------------
// Scripts
// ------------------------------------
/**
 * Copies JS from ./src to ./build, creates sourcemaps, lints
 * @task  {scripts}
 * @group {Main}
 */
g.task('scripts', function() {
	return g.src(scripts.input)
		.pipe(gulpif(opt.scripts.lint, jshint()))
		.pipe(gulpif(opt.scripts.lint, jshint.reporter('jshint-stylish-ex')))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write({ includeContent: false }))
		.pipe(g.dest(scripts.output))
		.pipe(browserSync.reload({ stream: true }));
});


/**
 * Lints JS even if linting is off in config
 * @task  {scripts:lint}
 * @group {Utilities}
 */
g.task('scripts:lint', function() {
	return g.src(scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish-ex'))
});


/**
 * Makes JS files pretty and readible. Helpful when you need to dig through a file that's been minified
 * @task  {scripts:beautify}
 * @group {Utilities}
 */
g.task('scripts:beautify', function() {
	return g.src(scripts.input)
		.pipe(beautify(opt.scripts.beautify))
		.pipe(g.dest(scripts.beautifyOutput))
});
// REVIEW: May be able to use uglify to replace beautify


// ------------------------------------
// Pug/HTML/Views
// ------------------------------------
/**
 * Compiles Pug into HTML, uses data from data.json, lints
 * @task  {pug}
 * @group {Main}
 */
g.task('pug', ['data'], function() {
	return g.src([viewsPug.input, '!' + viewsPug.partials])
		.pipe(gulpif(opt.pug.useData, data(function(file) {
			return JSON.parse(fs.readFileSync(db.file));
		})))
		.pipe(gulpif(opt.pug.lint, puglint()))
		.pipe(pug(opt.pug.output))
		.pipe(g.dest(viewsPug.output));
});




/**
 * Gets data from the json data files and compiles them into data.json to be used by `gulp pug`
 * @task  {data}
 * @group {Main}
 */
g.task('data', function() {
	return g.src(db.input)
		.pipe(merge({
			fileName: db.fileName,
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
		.pipe(g.dest(db.output));
});


/**
 * Lints Pug even if linting is off in config
 * @task  {pug:lint}
 * @group {Utilities}
 */
g.task('pug:lint', function() {
	return g.src([viewsPug.input, viewsPug.partials])
		.pipe(puglint())
});


/**
 * Converts HTML files to Pug. (Run `clean:html` after to remove original files)
 * @task  {html2pug}
 * @group {Utilities}
 */
g.task('html2pug', function() {
	g.src(html.input)
		.pipe(html2pug())
		.pipe(rename({ dirname: '' }))
		.pipe(prettyPug(opt.pug.prettyPug))
		.pipe(g.dest(srcViews + '/'));

	g.src(html.input)
		.pipe(g.dest(viewsPug.convertedHtml));
});


// ------------------------------------
// Production
// ------------------------------------
/**
 * Deletes HTML files from ./src
 * @task  {clean:html}
 * @group {Utilities}
 */
g.task('clean:html', function() {
	// return del.sync(html.input);
	return del.sync(viewsPug.convertedHtml);
});


/**
 * Concats and Minifys CSS & JS
 * @task  {concat}
 * @group {Production}
 */
g.task('concat', function() {
	return g.src(html.buildFiles)
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssnano()))
		.pipe(g.dest(build));
});


/**
 * Minifys HTML. Options: Remove comments, minify inline CSS/JS.
 * @task  {minify}
 * @group {Production}
 */
g.task('minify', function() {
	return g.src(html.buildFiles)
		.pipe(htmlmin(opt.minifyHtml))
		.pipe(g.dest(build + '/'));
});


/**
 * Prints file tree of the ./build directory to the CLI
 * @task  {tree}
 * @group {Utilities}
 */
g.task('tree', function() {
	var once = true; // lalz0r
	g.src(build + '/**')
		.pipe(map(function(file) {
			if (file.path.match(build))
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


// ------------------------------------
// Utilities/Misc
// ------------------------------------
/**
 * Opens browser to the specified file
 * @task {open}
 * @group {Utilities}
 */
g.task('open', function(){
	g.src(opt.openfile)
	.pipe(open());
});

// Alias Task
g.task('o', ['open']);


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
 * Copies fonts to from ./src to ./build
 * @task  {fonts}
 * @group {Main}
 */
g.task('fonts', function() {
	return g.src(fonts.input)
		.pipe(g.dest(fonts.output));
});


/**
 * Copies/optimizes/caches images from ./src to ./build directory
 *   (Use 'images:clean:cache' to remove cached files)
 * @task  {images}
 * @group {Main}
 */
g.task('images', function() {
	g.src(images.site.input)
		.pipe(cache(imagemin(opt.images.output)))
		.pipe(g.dest(images.site.output));
	g.src(images.root.input)
		.pipe(cache(imagemin(opt.images.output)))
		.pipe(g.dest(images.root.output));
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
	fs.remove(build, err => {
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
