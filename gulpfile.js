// Fresh v3.0.7
// ------------------------------------------------------------------

// Open new browser window every time you run 'gulp'?
var openBrowserWindow = false;

var base = {
	src: "./src",
	build: "./build"
},
	srcViews = base.src + "/views",
	srcStyles = base.src + "/sass",
	srcScripts = base.src + "/js",
	srcFonts = base.src + "/fonts",
	srcImages = base.src + "/images",
	buildCss = base.build + "/css",
	buildJs = base.build + "/js",
	buildImages = base.build + "/images",
	buildFonts = base.build + "/fonts",
	// ------------------------------------
	// Styles
	// ------------------------------------
	styles = {
		// Paths
		input: srcStyles + "/**/*.s+(a|c)ss",
		output: buildCss,

		// Config Options
		opts: {
			output: {
				errLogToConsole: true,
				outputStyle: "expanded",
				sourceComments: "true",
				indentType: "tab",
				indentWidth: "1"
			},
			prefixer: ["last 2 versions", "ie >= 9", "and_chr >= 2.3"],
			lint: false,
			lintConfig: {
				configFile: "./.sasslint.yml"
			},
			lintFixConfig: {
				configFile: "./.sasslint-fix.yml"
			},
			quoteStyle: "single"
		}
	},
	// ------------------------------------
	// Scripts
	// ------------------------------------
	scripts = {
		// Paths
		input: srcScripts + "/**/*.js",
		output: buildJs,
		beautifyOutput: srcScripts,

		jquery: {
			input: "./node_modules/jquery/dist/jquery.min.js",
			output: buildJs
		},

		// Config Options
		opts: {
			lint: false,
			beautify: {
				// Options: git.io/vVyYB
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
		srcFiles: srcViews + "/**/*.html",
		productionFiles: base.build + "/**/*.html",
		converted: srcViews + "/converted-html",

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
		input: srcViews + "/**/*.pug",
		partials: srcViews + "/**/_*.pug",
		output: base.build,

		// Config Options
		opts: {
			useData: true,
			lint: true,
			output: {
				pretty: "	",
				basedir: srcViews
			},
			prettyPug: {
				omit_empty_lines: true,
				fill_tab: true,
				omit_div: true
				// tab_size: 2   // Only used with 'fill_tab' == false
			}
		}
	},
	db = {
		input: srcViews + "/data/**/*.json",
		output: srcViews,
		fileName: "data.json",
		fileDir: srcViews
	},
	// ------------------------------------
	// Fonts/Images/Misc Dependencies
	// ------------------------------------
	fonts = {
		input: srcFonts + "/**/*",
		output: buildFonts,
		dependency: {
			input: "./node_modules/open-sans-fonts/open-sans/**/*",
			output: srcFonts + "/open-sans/"
		}
	},
	images = {
		// Paths
		input: base.src + "/images/**/*.+(png|jpg|jpeg|gif|svg|ico)",
		output: base.build + "/images/",

		// Config Options
		opts: {
			interlaced: true
		}
	},
	owlCarousel = {
		inputCss: "./node_modules/owl.carousel/dist/assets/owl.carousel.css",
		outputCss: buildCss + "/",
		inputJs: "./node_modules/owl.carousel/dist/owl.carousel.js",
		outputJs: buildJs + "/"
	};

// ------------------------------------
// CONFIGURE - Developement
// ------------------------------------
var config = {
	// Configure browserSync settings
	browserSync: {
		// proxy: 'yoursite.dev',
		// tunnel: 'yoursite', // yoursite.localtunnel.me
		server: base.build,
		open: openBrowserWindow,
		injectChanges: true,
		notify: false,
		port: 3000,
		ui: { port: 8080 }
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
};

// ------------------------------------------------------------------
// Plugins
// ------------------------------------------------------------------
var g = require("gulp"),
	sass = require("gulp-sass"),
	sassLint = require("gulp-sass-lint"),
	prefix = require("gulp-autoprefixer"),
	cssnano = require("gulp-cssnano"),
	uglify = require("gulp-uglify"),
	beautify = require("gulp-beautify"),
	sourcemaps = require("gulp-sourcemaps"),
	htmlmin = require("gulp-htmlmin"),
	html2pug = require("gulp-html2pug"),
	prettyPug = require("gulp-pug-beautify"),
	puglint = require("gulp-pug-lint"),
	pug = require("gulp-pug"),
	data = require("gulp-data"),
	path = require("path"),
	merge = require("gulp-merge-json"),
	imagemin = require("gulp-imagemin"),
	cache = require("gulp-cache"),
	fs = require("fs-extra"),
	useref = require("gulp-useref"),
	gulpif = require("gulp-if"),
	browserSync = require("browser-sync"),
	runSequence = require("run-sequence"),
	replaceQuotes = require("gulp-replace-quotes"),
	rename = require("gulp-rename"),
	del = require("del"),
	usage = require("gulp-help-doc"),
	plumber = require("gulp-plumber"),
	prettierEslint = require("gulp-prettier-eslint"),
	run = require("gulp-run"),
	// Tree
	archy = require("archy"),
	map = require("gulp-map"),
	filetree = require("gulp-filetree"),
	prettier = require("gulp-plugin-prettier");

// ------------------------------------
// Tasks
// ------------------------------------
/**
 * Runs compile tasks and starts the localhost server
 * @task  {default}
 * @group {Main}
 */
g.task("default", function (callback) {
	runSequence("compile", ["serve"], callback);
});

/**
 * Runs tasks: styles, scripts, pug, images, and fonts
 * @task  {compile}
 * @group {Main}
 */
g.task("compile", ["styles", "scripts", "jquery", "pug", "images", "fonts"]);

/**
 * Runs tasks: compile, concat, and tree
 * @task  {build}
 * @group {Production}
 */
g.task("build", function (callback) {
	runSequence("clean", "compile", "concat", "minify", "tree", callback);
});

// ------------------------------------
// Styles
// ------------------------------------
/**
 * Compiles SASS into CSS, auto-prefixes, creates sourcemaps, lints
 * @task  {styles}
 * @group {Main}
 */
g.task("styles", () => {
	return g
		.src(styles.input)
		.pipe(gulpif(styles.opts.lint, sassLint(styles.opts.lintConfig)))
		.pipe(gulpif(styles.opts.lint, sassLint.format()))
		.pipe(sourcemaps.init())
		.pipe(sass(styles.opts.output).on("error", sass.logError))
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
g.task("styles:lint", () => {
	return g
		.src(styles.input)
		.pipe(sassLint(styles.opts.lintConfig))
		.pipe(sassLint.format());
});

/**
 * Fixes styles (.sass and .scss files)
 * @task  {styles:fix}
 * @group {Utilities}
 */
g.task("fix:styles", ["styles:quotes"], () => run("yarn fix").exec());

/**
 * Replaces double quotes with single
 * @task  {styles:quotes}
 * @group {Utilities}
 */
g.task("styles:quotes", () => {
	g.src(styles.input, { base: "./" })
		.pipe(replaceQuotes({
			quote: styles.opts.quoteStyle
		}))
		.pipe(g.dest("./"));
});


// ------------------------------------
// Scripts
// ------------------------------------
/**
 * Copies JS from ./src to ./build, creates sourcemaps, lints
 * @task  {scripts}
 * @group {Main}
 */
g.task("scripts", () => {
	return g
		.src(scripts.input)
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write({ includeContent: false }))
		.pipe(g.dest(scripts.output))
		.pipe(browserSync.reload({ stream: true }));
});

/**
 * Fixes JS
 * @task  {scripts:fix}
 * @group {Utilities}
 */
g.task("scripts:fix", () => {
	return g
		.src(scripts.input)
		.pipe(prettierEslint())
		.pipe(g.dest(file => file.base));
});

/**
 * Makes JS files pretty and readible. Helpful when you need to dig through a file that's been minified
 * @task  {scripts:beautify}
 * @group {Utilities}
 */
g.task("scripts:beautify", () => {
	return g
		.src(scripts.input)
		.pipe(beautify(scripts.opts.beautify))
		.pipe(g.dest(scripts.beautifyOutput));
});
// REVIEW: May be able to use uglify to replace beautify

/**
 * Copies jquery.min.js from node_modules to ./build
 * @task  {jquery}
 * @group {Utilities}
 */
g.task("jquery", () => {
	return g.src(scripts.jquery.input).pipe(g.dest(scripts.jquery.output));
});

// ------------------------------------
// Pug/HTML/Views
// ------------------------------------
/**
 * Compiles Pug into HTML, uses data from data.json, lints
 * @task  {pug}
 * @group {Main}
 */
g.task("pug", ["data"], () => {
	return g
		.src([views.input, "!" + views.partials])
		.pipe(
			gulpif(
				views.opts.useData,
				data(function (file) {
					return JSON.parse(fs.readFileSync(db.fileDir + "/" + db.fileName));
				})
			)
		)
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
g.task("data", () => {
	return g
		.src(db.input)
		.pipe(
			merge({
				fileName: db.fileName,
				edit: (json, file) => {
					// Extract the filename and strip the extension
					var filename = path.basename(file.path),
						primaryKey = filename.replace(path.extname(filename), "");
					// Set the filename as the primary key for our JSON data
					var data = {};
					data[primaryKey.toUpperCase()] = json;
					return data;
				}
			})
		)
		.pipe(g.dest(db.output));
});

/**
 * Lints Pug even if linting is off in config
 * @task  {pug:lint}
 * @group {Utilities}
 */
g.task("pug:lint", () => {
	return g.src([views.input, views.partials]).pipe(puglint());
});

/**
 * Converts HTML to Pug and moves original files to a separate directory.
 * @task  {html2pug}
 * @group {Utilities}
 */
g.task("html2pug", ["move:html"], () => {
	return del.sync([html.srcFiles, "!" + html.converted + "/**/*.html"]);
});

g.task("move:html", ["convert:html"], () => {
	return g.src(html.srcFiles).pipe(g.dest(html.converted));
});

g.task("convert:html", () => {
	return (
		g
			.src(html.srcFiles)
			.pipe(html2pug())
			// .pipe(rename({ dirname: '' }))
			.pipe(prettyPug(views.opts.prettyPug))
			.pipe(g.dest(srcViews))
	);
});

/**
 * Deletes HTML files that were backed up during 'html2pug' task
 * @task  {clean:html}
 * @group {Utilities}
 */
g.task("clean:html", () => {
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
g.task("concat", () => {
	return g
		.src(html.productionFiles)
		.pipe(useref())
		.pipe(gulpif("*.js", uglify()))
		.pipe(gulpif("*.css", cssnano()))
		.pipe(g.dest(base.build));
});

/**
 * Minifys HTML. Options: Remove comments, minify inline CSS/JS.
 * @task  {minify}
 * @group {Production}
 */
g.task("minify", () => {
	return g
		.src(html.productionFiles)
		.pipe(htmlmin(html.opts))
		.pipe(g.dest(base.build + "/"));
});

/**
 * Prints file tree of the ./build directory to the CLI
 * @task  {tree}
 * @group {Utilities}
 */
g.task("tree", () => {
	var once = true; // lalz0r
	g.src(base.build + "/**")
		.pipe(
			map(function (file) {
				if (file.path.match(base.build)) return file;
			})
		)
		.pipe(filetree({ cwdRelative: true }))
		.pipe(
			map(function (file) {
				if (once) {
					console.log(archy(file.tree));
					once = !once;
				}
				return file;
			})
		);
});

// ------------------------------------
// Utilities/Misc
// ------------------------------------
/**
 * Copies fonts to from ./src to ./build
 * @task  {fonts}
 * @group {Main}
 */
g.task("fonts", () => {
	return g.src(fonts.input).pipe(g.dest(fonts.output));
});

/**
 * Copies/optimizes/caches images from ./src to ./build directory
 *   (Use 'clean' to remove cached images. This also removes the `./build` directory.)
 * @task  {images}
 * @group {Main}
 */
g.task("images", () => {
	g.src(images.input)
		.pipe(cache(imagemin(images.opts)))
		.pipe(g.dest(images.output));
});

/**
 * Deletes ./build directory and clears out the image cache created with `gulp images`
 * @task  {clean}
 * @group {Utilities}
 */
g.task("clean", function (callback) {
	// Clear out image cache
	cache.clearAll();

	// Delete ./build directory
	fs.remove(base.build, err => {
		if (err) return console.error(err);
		callback();
	});
});

/**
 * Starts BrowserSync Server on localhost, watches
 * files for changes and triggers build
 * @task  {serve}
 * @group {Main}
 */
g.task("serve", () => {
	browserSync.init(config.browserSync);
	// Watch
	if (config.watch.styles) {
		g.watch(config.watch.styles, ["styles"]);
	}
	if (config.watch.scripts) {
		g.watch(config.watch.scripts, ["scripts"]);
	}
	if (config.watch.views) {
		g.watch(config.watch.views, ["pug"]);
	}
	if (config.watch.data) {
		g.watch(config.watch.data, ["pug"]);
	}
	if (config.watch.reload) {
		g.watch(config.watch.reload).on("change", browserSync.reload);
	}
});

/**
 * Prints info about each task to the CLI
 * @task {help}
 * @group {Utilities}
 */
g.task("help", () => {
	return usage(g);
});

// ------------------------------------
// Dependency
// ------------------------------------
/**
 * Copies Open-Sans font files from ./node_modules to ./src
 * @task  {font:dependency}
 * @group {Utilities}
 */
g.task("font:dependency", () => {
	return g.src(fonts.dependency.input).pipe(g.dest(fonts.dependency.output));
});

/**
 * Copies Open-Sans font files from ./node_modules to ./src
 * @task  {font:dependency}
 * @group {Utilities}
 */
g.task("owl", () => {
	g.src(owlCarousel.inputCss).pipe(g.dest(owlCarousel.outputCss))
	g.src(owlCarousel.inputJs).pipe(g.dest(owlCarousel.outputJs))
});
