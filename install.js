// Fresh v3.0.1
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
fs.copy(node.gulpyD + '/gulpfile.js', './gulpfile.js', {
	overwrite: false,
	preserveTimestamps: true
}, err => {
	if (err) return console.error(err)
})

// ----------------
// Setup Project Scaffold

// Dev files
fs.copy(node.scaffoldD + '/src', './src', {
	overwrite: false,
	preserveTimestamps: true
}, err => {
	if (err) return console.error(err)
})


// Rename the cloned readme
// fs.move('./README.md', './README_fresh.md', {
// 	overwrite: false
// 	}, err => {
// 	if (err) return console.error(err)
// })

// HACK: Just to make it work without errors.
fs.stat('./README_fresh.md', function(err, stat) {
	if (err == null) {
		// If file exists: do nothing
	} else {
		// If file doesn't exist
		fs.renameSync('./README.md', './README_fresh.md')
		fs.copy(node.scaffoldD + '/rootfiles/README.md', './README.md', {
			overwrite: false,
			preserveTimestamps: true
		}, err => {
			if (err) return console.error(err)
		})
	}
});


// Copy dev files templates into the project
fs.copy(node.scaffoldD + '/rootfiles', './', {
	overwrite: false,
	preserveTimestamps: true
}, err => {
	if (err) return console.error(err)
})


// ----------------
// Setup Luscious

// Setup Luscious-sass
// fs.ensureSymlink(node.lusciousD, './dev/styles/utils/luscious', err => {
// 	if (err) return console.error(err)
// })

// Temporary--Copying instead of Symlinking
// fs.copy( node.lusciousD, './dev/styles/01_utils/luscious', {
// 	overwrite: false,
// 	preserveTimestamps: true
// 	}, err => {
// 	if (err) return console.error(err)
// })
