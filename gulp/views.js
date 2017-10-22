// Gulpy v0.0.1
//
// - views
// - html2pug
// - html2pug:clean
// - views:tabify
// -------------------------------------------------------------------

var g         = require( 'gulp'              );
var gulpif    = require( 'gulp-if'           );
var prettyPug = require( 'gulp-pug-beautify' );
var puglint   = require( 'gulp-pug-lint'     );
var html2pug  = require( 'gulp-html2pug'     );
var tabify    = require( 'gulp-tabify'       );
var rename    = require( 'gulp-rename'       );
var pug       = require( 'gulp-pug'          );
var del       = require( 'del'               );
var data      = require( 'gulp-data'         );
var fs        = require( 'fs'                );

var op = require(pth.options); // Config

// -------------------------------------------------------------------
// 2DO-GULPY: Add lint settings to .pug-lintrc


// Uses .html unless config is set to use pug
var source = pth.devD + pth.viewsD + pth.htmlFiles;
if (op.usePug) {
	var source = [
		pth.devD + pth.viewsD + pth.pugFiles,
		'!' + pth.pugPartials
	];
};

// ----------------

// true if pug and pug-linting are true
var lintPug = false;
if (op.usePug && op.lintPug) {
	var lintPug = true;
};

// ----------------

// true if using pug and is set to use gulp-data
var getData = false;
if (op.usePug && op.pipeData) {
	var getData = true;
};

// -------------------------------------


/**
 * If using HTML, copies files to `./staging`.
 * If using Pug, can pipe data from `data.json` to pug files, can lint pug, then compiles pug into HTML in `./staging`.
 *
 * @task  {views}
 * @group {Development}
 */
g.task('views', function() {
	return g.src( source )
		.pipe(gulpif(getData, data(function(file) {
			return JSON.parse(fs.readFileSync(op.dataPath));
		})))
		// .pipe(gulpif(op.usePug, tabify(2, true)))
		.pipe(gulpif(lintPug, puglint()))
		.pipe(gulpif(op.usePug, g.dest(pth.devD + pth.viewsD)))
		.pipe(gulpif(op.usePug, pug({ pretty: '	' })))
		.pipe(g.dest(pth.stagingD));
});


/**
 * Converts any .html file in `./dev/views` to .pug format.
 *
 * @task  {html2pug}
 * @group {Development}
 */
g.task('html2pug', function() {
	return g.src(pth.devD + pth.htmlFiles)
		.pipe(html2pug())
		// Make sure created .pug files are placed in 'views' dir
		.pipe(rename({dirname: ''}))
		// Make the output easy to read
		.pipe( prettyPug({
			omit_empty_lines: true,
			fill_tab: true,
			omit_div: true,
		}))
		.pipe(g.dest(pth.devD + pth.viewsD));
});


/**
 * Deletes any .html file in `./dev/views`.
 *
 * @task  {html2pug:clean}
 * @group {Helper}
 */
g.task('html2pug:clean', function() {
	return del.sync(pth.devD + pth.htmlFiles);
});


/**
 * Converts spaces to tabs on all .pug files
 *
 * @task  {views:tabify}
 * @group {Development}
 */
g.task('views:tabify', function() {
	return g.src([
		pth.devD + pth.viewsD + pth.pugFiles,
		pth.devD + pth.viewsD + pth.pugPartials,
	])
		.pipe(tabify( 2, true ))
		.pipe(g.dest(pth.devD + pth.viewsD))
});
