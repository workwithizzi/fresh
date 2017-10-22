// Gulpy v0.0.1
//
// - cms
// - html2php
// - clean:buildHtml
// - clean:index
// - rename:404
// - clean:staticCss
// -------------------------------------------------------------------

var g           = require( 'gulp'             );
var runSequence = require( 'run-sequence'     );
var touch       = require( 'touch'            );
var del         = require( 'del'              );
var removeCode  = require( 'gulp-remove-code' );
var rename      = require( 'gulp-rename'      );
var replace     = require( 'gulp-ex-replace'  );

var op = require(pth.options); // Config

// -------------------------------------------------------------------


/**
 * Runs a combination of tasks to prepare your build for your CMS. Tasks are: `html2php`, `rename:404`, `clean:staticCss`, `clean:buildHtml`, `clean:index`, `tree`.
 *
 * @task  {cms}
 * @group {CMS}
 * @order {01}
 */
g.task('cms', function(callback) {
	runSequence(
		'html2php',
		'rename:404',
		'clean:staticCss',
		'clean:buildHtml',
		'clean:index',
		'tree',
		callback
	)
});


/**
 * Converts HTML files in `./build` to Php. Removes any code between the 'remove tags': `removeIf(cms)` and `endRemoveIf(cms)`. Un-comments any code between `<!-- @@` and `@@ -->` (helpful for php that needs to be in the cms.)
 *
 * @task  {html2php}
 * @group {CMS}
 */
g.task('html2php', function() {
	return g.src(pth.buildD + pth.htmlFiles)
		.pipe(removeCode( { cms: true } ) )
		.pipe(replace('<!-- @@', ''))
		.pipe(replace('<!--@@', ''))
		.pipe(replace('@@-->', ''))
		.pipe(replace('@@ -->', ''))
		.pipe(rename({
			extname: '.php'
		}))
		.pipe(g.dest(pth.buildD));
});


/**
 * Removes original HTML and `404.php` from `./build`.
 *
 * @task  {clean:buildHtml}
 * @group {CMS}
 */
g.task('clean:buildHtml', function() {
	return del.sync([
		pth.buildD + pth.htmlFiles,
		pth.buildD + '/**/404.php'
	]);
});


/**
 * Creates an empty `index.html` file in `./build`. (Runs after converting original `index.html` to `index.php`).
 *
 * @task  {clean:index}
 * @group {CMS}
 */
g.task('clean:index', function() {
	touch(pth.buildD + '/index.html');
});


/**
 * Renames `404.php` to `error.php` in `./build`.
 *
 * @task  {rename:404}
 * @group {CMS}
 */
g.task('rename:404', function() {
	return g.src(pth.buildD + '/**/404.php')
		.pipe(rename({
			basename: "error"
		}))
		.pipe(g.dest(pth.buildD));
});


// 2DO-GULPY: Either find a way to use removecode to remove bang comments or wait to minify css/js until after the cms conversion.
/**
 * Removes any css code between `removeIf(cms)` and `endRemoveIf(cms)`. Make sure to use bang comments for these comment tags during development.
 *
 * @task  {clean:staticCss}
 * @group {CMS}
 */
g.task('clean:staticCss', function() {
	return g.src(pth.buildD + pth.stylesDestD + pth.cssFiles)
		.pipe(removeCode({
			cms: true,
			commentStart: '/*!',
			commentEnd: '*/',
		}))
		// .pipe( rename( 'removed.css' ) )
		.pipe(g.dest(pth.buildD + pth.stylesDestD));
});



// -------------------------------------------------------------------
// -------------------------------------------------------------------
// 2DO-Gulpy: Review remove code tasks and make sure they work properly
