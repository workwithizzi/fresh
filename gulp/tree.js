// Gulpy v0.0.1
//
// - tree : Print directory tree
// -------------------------------------------------------------------

var g        = require( 'gulp'          );
var archy    = require( 'archy'         );
var map      = require( 'gulp-map'      );
var filetree = require( 'gulp-filetree' );

var op = require(pth.options); // Config

// -------------------------------------------------------------------


/**
 * Prints a tree of the build dir that you can copy/paste info README.md.
 *
 * @task  {tree}
 * @group {Production}
 */
g.task('tree', function() {
	var once = true; // lalz0r
	g.src(pth.buildD + '/**')
		.pipe(map(function(file) {
			if(file.path.match(pth.buildD))
				return file
			}))
		.pipe(filetree({cwdRelative: true}))
		.pipe(map(function(file) {
			// file.tree: tree of files passed into filetree
			// file.subtree: subtree rooted at this file
			if(once) {
				console.log(archy(file.tree));
				once = !once;
			}
			return file;
		}))
});
