// Fresh
// @since v3.0.2
//
// ------------------------------------------------------------------

// ------------------------------------
// Tasks
// ------------------------------------
// - styles
// - styles:lint
// - scripts
// - scripts:lint
// - scripts:beautify
// - production (sets environment to production)
// - Runners
//   - default
//   - build


// ------------------------------------
// Plugins
// ------------------------------------
// General
var g = require('gulp');
var fs = require('fs-extra');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var env = require('gulp-environments');
var rename = require('gulp-rename');
var del = require('del');
var usage = require('gulp-help-doc');
var todo = require('gulp-todo');
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
// Views- Pug
var html2pug = require('gulp-html2pug');
var prettyPug = require('gulp-pug-beautify');
var puglint = require('gulp-pug-lint');
var pug = require('gulp-pug');
var data = require('gulp-data');
// Views
var htmlmin = require('gulp-htmlmin');
// Images
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
// Tree
var archy = require('archy');
var map = require('gulp-map');
var filetree = require('gulp-filetree');
// CMS
var removeCode = require('gulp-remove-code');
var replace = require('gulp-ex-replace');


// ------------------------------------
// Paths -- CONFIGURE THESE
// ------------------------------------
var base = {
	src: './src', // Source Code
	build: './build' // Processed Code for staging/distribution
}

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
	},
	todo: {
		input: base.src + '/**/*.+(html|css|js|sass|scss|pug)',
		output: './',
		file: './TODO.md'
	}
}


// ------------------------------------
// Options -- CONFIGURE THESE
// ------------------------------------
var opt = {
	minifyHtml: true,
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
		views: pth.pug.input,
		styles: pth.styles.input,
		scripts: pth.scripts.input,
		reload: pth.html.output + '**/*.html'
	}, //watch ----------------
	styles: {
		outputDev: {
			errLogToConsole: true,
			outputStyle: 'expanded',
			sourceComments: 'true',
			indentType: 'tab',
			indentWidth: '1'
		},
		outputPro: {
			errLogToConsole: true,
			outputStyle: 'compressed',
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
		dataPath: pth.srcD + '/views/data.json',
		lint: true,
		outputDev: {
			pretty: '	'
		},
		outputPro: {
			pretty: ''
		},
		prettyPug: {
			omit_empty_lines: true,
			fill_tab: true,
			omit_div: true,
			// tab_size: 2   // Only used with 'fill_tab' == false
		}
	}, //pug ----------------
	images: {
		output: {
			interlaced: true
		}
	}, //images ----------------
	todoTags: [
		'HOTFIX',
		'REVIEW',
		'2DO-CH',
		'2DO-YG',
		// '2DO-FRESH',
		'2DO-FRESH',
		'POSTLAUNCH',
		'2DO-LATER',
	]
} //opt



// ------------------------------------------------------------------
// Tasks
// ------------------------------------------------------------------


// ------------------------------------
// Combined Tasks
// ------------------------------------

/**
 * Runs compile tasks and starts the localhost server
 * @task  {default}
 * @group {Main}
 * @order {1}
 */
g.task('default', ['compile', 'serve']);


/**
 * Runs tasks: styles, scripts, pug, images, and fonts
 * @task  {compile}
 * @group {Main}
 * @order {2}
 */
g.task('compile', [
	'styles',
	'scripts',
	'pug',
	'images',
	'fonts'
]);


/**
 * Runs tasks: compile, concat, and tree
 * @task  {build}
 * @group {Production}
 * @order {1}
 */
g.task('build', function(callback) {
	env.current(env.production);
	runSequence('compile', 'concat', 'tree', callback)
});


/**
 * Deletes image cache with 'images:clean:cache' |
 * Deletes ./build directory
 * @task  {clean}
 * @group {Utilities}
 */
g.task('clean', [
	'images:clean:cache',
	'clean:build'
]);


/**
 * Prepares a static, production-ready site, to be added into a php-based CMS. |
 * Converts `404` to `error.php` and other HTML into Php |
 * Removes any HTML code between the tags: `removeIf(cms)` and
 * `endRemoveIf(cms)`—used to remove static code |
 * Un-comments HTML between the tags: `<!-- @@` & `@@-->` (used to make cms
 * specific code active) |
 * Creates empty index.html |
 * Prints final file tree to the cli |
 * @task  {cms}
 * @group {Production}
 * @order {3}
 */
g.task('cms', function(callback) {
	runSequence(
		'convert:404',
		'convert:html',
		'convert:css',
		'touch:index',
		'tree',
		callback);
});


// ------------------------------------
// Individual Tasks
// ------------------------------------

/**
 * Compiles SASS into CSS |
 * Auto-prefixes based on configs |
 * Creates sourcemaps in dev environment |
 * Options:
 *   Lints SASS, 
 *   Outputs CSS style based on dev/production environment
 * @task  {styles}
 * @group {Main}
 * @order {3}
 */
g.task('styles', function() {
	return g.src(pth.styles.input)
		.pipe(gulpif(opt.styles.lint, sassLint(opt.styles.linterOpts)))
		.pipe(gulpif(opt.styles.lint, sassLint.format()))
		.pipe(env.development(sourcemaps.init()))
		.pipe(env.development(sass(opt.styles.outputDev).on('error', sass.logError)))
		.pipe(env.production(sass(opt.styles.outputPro).on('error', sass.logError)))
		.pipe(prefix(opt.styles.prefixer))
		.pipe(env.development(sourcemaps.write({ includeContent: false })))
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
 * Creates sourcemaps in dev environment |
 * Minifies JS in production environment |
 * Options: Lints JS
 * @task  {scripts}
 * @group {Main}
 * @order {5}
 */
g.task('scripts', function() {
	return g.src(pth.scripts.input)
		.pipe(gulpif(opt.scripts.lint, jshint()))
		.pipe(gulpif(opt.scripts.lint, jshint.reporter('jshint-stylish-ex')))
		.pipe(env.development(sourcemaps.init()))
		.pipe(env.development(sourcemaps.write({ includeContent: false })))
		.pipe(env.production(uglify()))
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
 *   Outputs HTML style based on dev/production environment
 * @task  {pug}
 * @group {Main}
 * @order {4}
 */
g.task('pug', function() {
	return g.src([pth.pug.input, '!' + pth.pug.partials])
		.pipe(gulpif(opt.pug.useData, data(function(file) {
			return JSON.parse(fs.readFileSync(opt.pug.dataPath));
		})))
		.pipe(gulpif(opt.pug.lint, puglint()))
		.pipe(env.development(pug(opt.pug.outputDev)))
		.pipe(env.production(pug(opt.pug.outputPro)))
		.pipe(g.dest(pth.pug.output));
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
 * @order {6}
 */
g.task('fonts', function() {
	return g.src(pth.fonts.input)
		.pipe(g.dest(pth.fonts.output));
});


/**
 * Deletes ./build directory
 * @task  {clean:build}
 * @group {Utilities}
 */
g.task('clean:build', function() {
	fs.remove(pth.buildD, err => {
		if (err) return console.error(err)
	})
});


/**
 * Sets environment to Production.
 *  (Environment is set to 'development' by default) |
 *  [Alias] : `P`
 * @task  {production}
 * @group {Utilities}
 */
g.task('production', function() {
	env.current(env.production);
});

g.task('P', ['production']);


/**
 * Copies/optimizes/caches images from ./src to ./build directory
 *   (Use 'images:clean:cache' to remove cached files)
 * @task  {images}
 * @group {Main}
 * @order {7}
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
 * Clears out the image cache created with `gulp images`
 * @task  {images:clean:cache}
 * @group {Utilities}
 */
g.task('images:clean:cache', function(done) {
	cache.clearAll(done)
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
 * @order {8}
 */
g.task('serve', function() {
	browserSync.init(opt.browserSync);
	// Watch
	if (opt.watch.styles) { g.watch(opt.watch.styles, ['styles']); }
	if (opt.watch.scripts) { g.watch(opt.watch.scripts, ['scripts']); }
	if (opt.watch.views) { g.watch(opt.watch.views, ['pug']); }
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
 * Creates a 'todo.md' file |
 * (use 'gulp clean:todo' to remove the file) |
 * Configurable options:
 *   Files used to get todo notes,
 *   Todo Tags,
 *   Output directory (default is project root)
 * @task  {todo}
 * @group {Utilities}
 */
g.task('todo', function() {
	return g.src(pth.todo.input)
		.pipe(todo({
			customTags: opt.todoTags,
			// Modifies output header
			transformHeader: function(kind) {
				return [
					'### ' + kind,
					'| Filename | line # | ' + kind,
					'|:------|:------:|:------'
				]
			}
		}))
		.pipe(g.dest(pth.todo.output));
});


/**
 * Removes the 'todo.md' file created with 'gulp todo'
 * @task  {todo:clean}
 * @group {Utilities}
 */
g.task('todo:clean', function() {
	fs.remove(pth.todo.file, err => {
		if (err) return console.error(err)
	})
});


/**
 * Concats CSS & JS |
 * Options: Minifies HTML
 * @task  {concat}
 * @group {Production}
 * @order {2}
 */
g.task('concat', function() {
	return g.src(pth.html.buildFiles)
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssnano()))
		.pipe(gulpif(opt.minifyHtml, htmlmin({
			collapseWhitespace: true,
		})))
		.pipe(g.dest(pth.buildD + '/'));
});


/**
 * Prints usage info about `gulp concat`
 * @task  {concat:help}
 * @group {Utilities}
 */
g.task('concat:help', function() {
	console.log('To use `gulp concat`, start with a build tag,')
	console.log('then the files to concat, then close with an endbuild tag.')
	console.log('For example, an HTML file:')
	console.log('<!-- build:css css/main.min.css -->')
	console.log('<link rel="stylesheet" href="css/normalize.css">')
	console.log('<link rel="stylesheet" href="css/main.css">')
	console.log('<!-- endbuild -->')
});


// ------------------------------------
// CMS Tasks
// ------------------------------------
// TODO: Figure out how to glob files with fs-extra and replace 'del' module with 'fs-extra'

// Converts '404.html' to 'error.php'
g.task('convert:404', function() {
	fs.rename(pth.buildD + '/404.html', pth.buildD + '/error.php', err => {
		if (err) return console.log('No `404.html` file to rename.')
	});
});


// Converts all HTML files to php,
// Removes any code between the remove-tags,
// Removes any special comments so that inactive code is active
g.task('convert:html', ['convert:html:start'], function() {
	return del.sync(pth.html.buildFiles);
});


g.task('convert:html:start', function() {
	return g.src(pth.html.buildFiles)
		.pipe(removeCode({ cms: true }))
		.pipe(replace('<!-- @@', ''))
		.pipe(replace('<!--@@', ''))
		.pipe(replace('@@-->', ''))
		.pipe(replace('@@ -->', ''))
		.pipe(rename({
			extname: '.php'
		}))
		.pipe(g.dest(pth.buildD + '/'));
});


// Removes any code in css files that's between the remove-tags
g.task('convert:css', function() {
	return g.src(pth.buildD + '/**/*.css')
		.pipe(removeCode({
			cms: true,
			commentStart: '/*!',
			commentEnd: '*/',
		}))
		.pipe(g.dest(pth.buildD + '/'));
});


// Creates an empty 'index.html' file
// goo.gl/nGvcyC
g.task('touch:index', function() {
	fs.closeSync(fs.openSync(pth.buildD + '/index.html', 'w'));
});
