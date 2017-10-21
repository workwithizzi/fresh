// Fresh v3.0.0
//
// Automates project dev setup with Fresh-Scaffold
// -------------------------------------------------------------------

const fs = require('fs-extra')

// -------------------------------------

// Dependency variables
var node = {
	gulpyD: './node_modules/gulpy',
	scaffoldD: './node_modules/fresh-scaffold',
	lusciousD: './node_modules/luscious-sass'
}

// -------------------------------------

// Setup Gulpy

// 1. Copy gulpfile.js
// Goal: If there isn't a gulpfile.js in the project root,
// then copy the one from node_modules/gulpy.
fs.copy( node.gulpyD + '/gulpfile.js', './gulpfile.js', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})


// 2. Copy gulp.options.js
// Goal: If there isn't a gulp.options.js in the project root,
// then copy the one from node_modules/gulpy.
fs.copy( node.gulpyD + '/gulp.options.js', './gulp.options.js', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})


// 3. Symlink to Gulpy tasks
// Goal: If there's not already a gulpy directory in the root,
// create a symlink to the gulp tasks directory ('node_modules/gulpy/gulp')
// Would it be better to just copy this to the root or symlink?? I was thinking it would be better to symlink since we don't want to edit the gulp tasks from within this project. Another idea was to symlink it, then if you need to mdoify a task for this particular project you could run a command to turn remove the symlink and copy the actual files so they could be tracked.

// fs.ensureSymlink(node.gulpyD + '/gulp', './gulp', err => {
// 	if (err) return console.error(err)
// })

// Temporary--Copying instead of Symlinking
fs.copy( node.gulpyD + '/gulp', './gulp', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})


// ----------------
// Setup Project Scaffold

// 4. Dev files
// Goal: Copy directory from 'node_modules/fresh-scaffold/dev' to the root.
// Skip task if './dev' already exists.
fs.copy( node.scaffoldD + '/dev', './dev', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})


// 5. Rename the cloned readme
// Goal: Rename the included readme file so that it stays in the repo for
// reference. Need to set this up so that it only runs this task on the
// initial install. I guess the best way to do that would be to skip the
// task if there's already a 'README_fresh.md' in the root?
//
// This task and #6 throws an error if you run `yarn install` again after
// the initial install.
fs.move('./README.md', './README_fresh.md', {
	overwrite: false
	}, err => {
	if (err) return console.error(err)
})


// 6. Copy dev files templates into the project
// Goal: Copy all the files from 'node_modules/fresh-scaffold/rootfiles' to the
// project root. Need to set it up so that it ignores the README.md file if
// the rename readme task isn't run (see #5)
fs.copy( node.scaffoldD + '/rootfiles', './', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
		if (err) return console.error(err)
})


// ----------------
// Setup Luscious

// 7. Setup Luscious-sass
// Goal: Create a symlink from './node_modules/luscious-sass' to './dev/styles/01_utils/luscious'.
// Wondering the same thing about this one that I was for #3 with the Gulp tasks.

// fs.ensureSymlink(node.lusciousD, './dev/styles/01_utils/luscious', err => {
// 	if (err) return console.error(err)
// })

// Temporary--Copying instead of Symlinking
fs.copy( node.lusciousD, './dev/styles/01_utils/luscious', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})
