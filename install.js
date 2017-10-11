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

// Copy gulpfile.js
fs.copy( node.gulpyD + '/gulpfile.js', './gulpfile.js', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})

// Copy gulp.options
fs.copy( node.gulpyD + '/gulp.options.js', './gulp.options.js', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})

// Symlink to Gulpy tasks
fs.ensureSymlink(node.gulpyD + '/gulp', './gulp', err => {
	if (err) return console.error(err)
})

// ----------------

// Setup Scaffold

// dev files
fs.copy( node.scaffoldD + '/dev', './dev', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})

// Rename the Fresh readme
fs.move('./README.md', './README_fresh.md', {
	overwrite: false
	}, err => {
	if (err) return console.error(err)
})

// Copy dev files templates into the project
fs.copy( node.scaffoldD + '/rootfiles', './', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
		if (err) return console.error(err)
})

// ----------------

// Setup Luscious-sass
fs.ensureSymlink(node.lusciousD, './dev/styles/01_utils/luscious', err => {
	if (err) return console.error(err)
})
