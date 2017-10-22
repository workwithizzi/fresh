// Gulpy v0.0.1
//
// - deploy
// - deploy:setup
// - sync:pages
// -------------------------------------------------------------------
// 2DO-GULPY: Need to review.

var g      = require('gulp'          );
var shell  = require('gulp-shell'    );
var deploy = require('gulp-gh-pages' );

var op = require(pth.options); // Config

// -------------------------------------------------------------------


/**
 * Deploys `./build` to Github pages
 *
 * @task  {deploy}
 * @group {Production}
 */
g.task('deploy', function () {
	return g.src(pth.buildD + pth.allFiles)
		.pipe(deploy())
});


/**
 * Sets up gh-pages branch
 *
 * @task  {deploy:setup}
 * @group {Production}
 */
g.task('deploy:setup', shell.task([
	'. ./gulp/shell/ghpages.sh'
]));


/**
 * Syncs gh-pages branch with Github pages.
 *
 * @task  {sync:pages}
 * @group {Production}
 */
g.task('sync:pages', shell.task([
	'. ./gulp/shell/commitpush.sh'
]));


// -------------------------------------------------------------------
// Creating the gh-pages branch from command line.
// -------------------------------------------------------------------

// Checkout your working branch that you want to build from. Then copy/paste the below command into terminal to:
// - Create a gh-pages branch
// - Create a temporary readme file
// - Create a .gitignore file and add `node_modules` to the ignore list
// - Commit the files/changes and push to the gh-pages branch
// - Checkout the Master branch
//
// Command:
// git checkout --orphan gh-pages && git rm -rf . && touch README.md && git add README.md && touch .gitignore && echo "node_modules" > .gitignore && git add .gitignore && git commit -m "Init gh-pages" && git push --set-upstream origin gh-pages &&  git checkout master
