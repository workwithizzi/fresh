// Gulpy v0.0.1
//
// - fonts
// - fonts:build
// -------------------------------------------------------------------

var g  = require('gulp');
var op = require(pth.options); // Config

// -------------------------------------------------------------------

/**
 * Copies all files in `dev/fonts` to `staging/fonts`.
 *
 * @task  {fonts}
 * @group {Development}
 */
g.task('fonts', function() {
	return g.src(pth.devD + pth.fontsD + pth.allFiles)
		.pipe(g.dest(pth.stagingD + pth.fontsD));
});


/**
 * Copies all files in `dev/fonts` to `build/fonts`.
 *
 * @task  {fonts:build}
 * @group {Production}
 */
g.task('fonts:build', function() {
	return g.src(pth.devD + pth.fontsD + pth.allFiles)
		.pipe(g.dest(pth.buildD + pth.fontsD));
});
