// Fresh
// @since v3.0.7
// ------------------------------------------------------------------


// Open new browser window every time you run 'gulp'?
var openBrowserWindow = true;


var base = {
			src:   './src',
			build: './build'
		},

		srcViews    = base.src + '/views',
		srcStyles   = base.src + '/sass',
		srcScripts  = base.src + '/js',
		srcFonts    = base.src + '/fonts',
		srcImages   = base.src + '/images',
		buildCss    = base.build + '/css',
		buildJs     = base.build + '/js',
		buildImages = base.build + '/images',
		buildFonts  = base.build + '/fonts',

		// ------------------------------------
		// Styles
		// ------------------------------------
		styles = {
			// Paths
			input: srcStyles + '/**/*.{scss,sass}',
			output: buildCss,

			// Config Options
			opts: {
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
				lintConfig: {
					files: { ignore: '**/*normalize.scss' },
					configFile: './.sass-lint.yml'
				}
			}
		},

		// ------------------------------------
		// Scripts
		// ------------------------------------
		scripts = {
			// Paths
			input: srcScripts + '/**/*.js',
			output: buildJs,
			beautifyOutput: srcScripts,

			// Config Options
			opts: {
				lint: false,
				beautify: { // Options: git.io/vVyYB
					indent_size: 2,
					indent_with_tabs: true
				}
			}
		},

		// ------------------------------------
		// HTML/Views/Database
		// ------------------------------------
		html = {
			// Paths
			srcFiles: srcViews + '/**/*.html',
			productionFiles: base.build + '/**/*.html',
			converted: srcViews + '/converted-html',

			// Config Options
			opts: {
				collapseWhitespace: true,
				removeComments: true,
				minifyCSS: true,
				minifyJS: true
			}
		},

		views = {
			// Paths
			input: srcViews + '/**/*.pug',
			partials: srcViews + '/**/_*.pug',
			output: base.build,

			// Config Options
			opts: {
				useData: true,
				lint: true,
				output: {
					pretty: '	',
					basedir: srcViews
				},
				prettyPug: {
					omit_empty_lines: true,
					fill_tab: true,
					omit_div: true,
					// tab_size: 2   // Only used with 'fill_tab' == false
				}
			}
		},

		db = {
			input: srcViews + '/data/**/*.json',
			output: srcViews,
			fileName: 'data.json',
			fileDir: srcViews
		},

		// ------------------------------------
		// Assets - Fonts/Images
		// ------------------------------------
		fonts = {
			input: srcFonts + '/**/*',
			output: buildFonts
		},

		images = {
			// Paths
			site: {
				input: [
					srcImages + '/**/*.+(png|jpg|jpeg|gif|svg|ico)',
					'!/**/*(favicon.ico|apple-touch-icon.png)'
				],
				output: buildImages
			},
			root: {
				input: srcImages + '/**/*(favicon.ico|apple-touch-icon.png)',
				output: base.build
			},

			// Config Options
			opts: {
				interlaced: true
			}
		},

		// ------------------------------------
		// Luscious-Sass
		// ------------------------------------
		luscious = {
			core: {
				input: './node_modules/luscious-sass',
				output: './luscious-sass',
				overwrite: false
			},
			scaffold: {
				input: './node_modules/luscious-sass/scaffold',
				output: srcStyles
			}
		};

// ------------------------------------
// CONFIGURE - Developement
// ------------------------------------
var config = {
	// Add files to the array to open them manually using 'gulp open'
	openfile: [
		base.build + '/index.html'
	],
	// Configure browserSync settings
	browserSync: {
		// proxy: 'yoursite.dev',
		// tunnel: 'yoursite', // yoursite.localtunnel.me
		server: base.build,
		open: openBrowserWindow,
		injectChanges: true,
		notify: false,
		port: 3000,
		ui: { port: 8080 },
	},
	// Comment out anything in the array that you
	// don't want to watch/trigger build on change.
	watch: {
		data: db.input,
		views: views.input,
		styles: styles.input,
		scripts: scripts.input,
		reload: html.productionFiles
	}
}

// ------------------------------------
// CONFIGURE - Project Dependencies
// ------------------------------------
// Un-comment any of the dependencies below to include them in the project.
// You can also add any others to the list that you want to bring in.
// Just make sure to add them to the package.json.
var vendors = [{
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
	// 	"output": buildFonts
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
}];


// ------------------------------------------------------------------
// Plugins
// ------------------------------------------------------------------
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
		plumber = require('gulp-plumber'),
		// Tree
		archy = require('archy'),
		map = require('gulp-map'),
		filetree = require('gulp-filetree'),
		prettierEslint = require('gulp-prettier-eslint');


// ------------------------------------
// Tasks
// ------------------------------------
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
// Get Luscious
// ------------------------------------
/**
 * Copies Luscious from node_modules and adds it to the project's dependencies.
 * @task  {luscious}
 * @group {Main}
 */
g.task('luscious', () => {
	fs.copy(luscious.core.input, luscious.core.output, {
		overwrite: luscious.core.overwrite,
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
	fs.copy(luscious.scaffold.input, luscious.scaffold.output, {
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
		.pipe(gulpif(styles.opts.lint, sassLint(styles.opts.lintConfig)))
		.pipe(gulpif(styles.opts.lint, sassLint.format()))
		.pipe(sourcemaps.init())
		.pipe(sass(styles.opts.output).on('error', sass.logError))
		.pipe(prefix(styles.opts.prefixer))
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
		.pipe(sassLint(styles.opts.lintConfig))
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
		.pipe(gulpif(scripts.opts.lint, jshint()))
		.pipe(gulpif(scripts.opts.lint, jshint.reporter('jshint-stylish-ex')))
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
 * Fixes JS
 * @task  {scripts:fix}
 * @group {Utilities}
 */
g.task('scripts:fix', function() {
	return g.src(scripts.input, { base: './' } )
		.pipe(prettierEslint() )
		.pipe(g.dest('./') )
});

/**
 * Makes JS files pretty and readible. Helpful when you need to dig through a file that's been minified
 * @task  {scripts:beautify}
 * @group {Utilities}
 */
g.task('scripts:beautify', function() {
	return g.src(scripts.input)
		.pipe(beautify(scripts.opts.beautify))
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
	return g.src([views.input, '!' + views.partials])
		.pipe(gulpif(views.opts.useData, data(function(file) {
			return JSON.parse(fs.readFileSync(db.fileDir + '/' + db.fileName));
		})))
		.pipe(gulpif(views.opts.lint, puglint()))
		.pipe(plumber())
		.pipe(pug(views.opts.output))
		.pipe(g.dest(views.output));
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
	return g.src([views.input, views.partials])
		.pipe(puglint())
});


/**
 * Converts HTML to Pug and moves original files to a separate directory.
 * @task  {html2pug}
 * @group {Utilities}
 */
g.task('html2pug', ['move:html'], function() {
	return del.sync([
		html.srcFiles,
		'!' + html.converted + '/**/*.html'
	]);
});

g.task('move:html', ['convert:html'], function() {
	return g.src(html.srcFiles)
		.pipe(g.dest(html.converted));
});

g.task('convert:html', function() {
	return g.src(html.srcFiles)
		.pipe(html2pug())
		// .pipe(rename({ dirname: '' }))
		.pipe(prettyPug(views.opts.prettyPug))
		.pipe(g.dest(srcViews));
});


/**
 * Deletes HTML files that were backed up during 'html2pug' task
 * @task  {clean:html}
 * @group {Utilities}
 */
g.task('clean:html', function() {
	return del.sync(html.converted);
});


// ------------------------------------
// Production
// ------------------------------------
/**
 * Concats and Minifys CSS & JS
 * @task  {concat}
 * @group {Production}
 */
g.task('concat', function() {
	return g.src(html.productionFiles)
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssnano()))
		.pipe(g.dest(base.build));
});


/**
 * Minifys HTML. Options: Remove comments, minify inline CSS/JS.
 * @task  {minify}
 * @group {Production}
 */
g.task('minify', function() {
	return g.src(html.productionFiles)
		.pipe(htmlmin(html.opts))
		.pipe(g.dest(base.build + '/'));
});


/**
 * Prints file tree of the ./build directory to the CLI
 * @task  {tree}
 * @group {Utilities}
 */
g.task('tree', function() {
	var once = true; // lalz0r
	g.src(base.build + '/**')
		.pipe(map(function(file) {
			if (file.path.match(base.build))
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
	g.src(config.openfile)
	.pipe(open());
});

// Alias Task
g.task('o', ['open']);


/**
 * Imports dependencies specified in the 'vendors' array
 * @task {vendors}
 * @group {Utilities}
 */
g.task('vendors', function() {
	for(var i = 0; i < vendors.length; i++) {
		var file = vendors[i]
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
		.pipe(cache(imagemin(images.opts)))
		.pipe(g.dest(images.site.output));
	g.src(images.root.input)
		.pipe(cache(imagemin(images.opts)))
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
	fs.remove(base.build, err => {
		if (err) return console.error(err)
		callback();
	})
});


/**
 * Starts BrowserSync Server on localhost, watches
 * files for changes and triggers build
 * @task  {serve}
 * @group {Main}
 */
g.task('serve', function() {
	browserSync.init(config.browserSync);
	// Watch
	if (config.watch.styles) { g.watch(config.watch.styles, ['styles']); }
	if (config.watch.scripts) { g.watch(config.watch.scripts, ['scripts']); }
	if (config.watch.views) { g.watch(config.watch.views, ['pug']); }
	if (config.watch.data) { g.watch(config.watch.data, ['pug']); }
	if (config.watch.reload) {
		g.watch(config.watch.reload).on('change', browserSync.reload);
	}
});


/**
 * Prints info about each task to the CLI
 * @task {help}
 * @group {Utilities}
 */
g.task('help', function() { return usage(g); });
