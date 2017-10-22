// Gulpy v0.0.1
//
// - clean
// - clean:build
// - clean:staging
// -------------------------------------------------------------------

var g   = require('gulp' );
var del = require('del'  );

// -------------------------------------------------------------------


/**
 * Removes staging and build directories
 *
 * @task  {clean}
 * @group {Helper}
 */
g.task('clean', function() {
	return del.sync([ pth.stagingD, pth.buildD ]);
});


/**
 * Removes build directory.
 *
 * @task  {clean:build}
 * @group {Helper}
 */
g.task('clean:build', function() {
	return del.sync([pth.buildD]);
});


/**
 * Removes staging directory.
 *
 * @task  {clean:staging}
 * @group {Helper}
 */
g.task('clean:staging', function() {
	return del.sync([pth.stagingD]);
});
