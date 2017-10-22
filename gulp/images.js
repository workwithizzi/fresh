// Gulpy v0.0.1
//
// - images
// - images:build
// - images:clean:cache
// -------------------------------------------------------------------

var g        = require( 'gulp'          );
var imagemin = require( 'gulp-imagemin' );
var cache    = require( 'gulp-cache'    );

var op = require(pth.options); // Config

// -------------------------------------------------------------------


/**
 * Copies/optimizes/caches images from `./dev/images` and puts them in `./staging/images`.
 * Copies root images to project root.
 *
 * @task  {images}
 * @group {Development}
 */
g.task('images', function() {
	g.src([
		pth.devD + pth.imagesD + pth.imagesAll,
		'!' + pth.devD + pth.imagesD + pth.imagesRootD + pth.imagesAll
	])
		.pipe(cache(imagemin({
			interlaced: true,
		})))
		.pipe(g.dest(pth.stagingD + pth.imagesD));

	g.src(pth.devD + pth.imagesD + pth.imagesRootD + pth.imagesAll)
		.pipe(g.dest(pth.stagingD));
});


// ----------------

// Path changes based on 'dynamic' or 'static' build environment for build task
// If Production env, ignore images in a dir that contains '@@' in the name
var buildSource = pth.stagingD + pth.imagesD + pth.imagesAll;
if (op.isDynamic) {
	var buildSource = [
		pth.stagingD + pth.imagesD + pth.imagesAll,
		'!' + pth.stagingD + pth.imagesD + pth.ignore + pth.imagesAll,
	];
};


/**
 * Copies optimized images from `./staging/images` to `./build/images`.
 * Copies root images to project root.
 *
 * @task  {images:build}
 * @group {Helper}
 */
g.task('images:build', function() {
	g.src(buildSource)
		.pipe(g.dest(pth.buildD + pth.imagesD));

	g.src(pth.devD + pth.imagesD + pth.imagesRootD + pth.imagesAll)
		.pipe(g.dest(pth.buildD));
});

// ----------------

/**
 * Clears out the optimized image cache created with `gulp images`.
 *
 * @task  {images:clean:cache}
 * @group {Helper}
 */
g.task('images:clean:cache', function (done) {
	cache.clearAll(done)
});




// -------------------------------------------------------------------
// -------------------------------------------------------------------
// 2DO-GULPY: create a way to ignore @@ for production and rootimg images should be put directly in output folder root.
