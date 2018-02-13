// Fresh
// @since v3.0.2
//
// Automates project setup with dependencies
// ------------------------------------------------------------------

const fs = require('fs-extra')


// ------------------------------------
// Dependency Paths
// ------------------------------------

// Project Resources
var rsc = './__rsc__'

// Luscious Sass
var luscious = {
	src: './dependencies/luscious_sass',
	// dest: './dependencies/luscious_sass',
	overwrite: true,
	scaffold: {
		src: './dependencies/luscious_sass/__rsc__/styles_scaffold',
		dest: './dev/styles'
	}
}

// Normalize CSS/SASS
var normalize = {
	src: './node_modules/normalize.css/normalize.css',
	dest: './dependencies/normalize_sass/_normalize.scss',
	overwrite: true,
	// CSS version
	css: {
		dest: './dependencies/normalize_sass/normalize.css'
	}
}


// ------------------------------------
// Setup Luscious
// ------------------------------------

// Luscious Core
// fs.copy( luscious.src, luscious.dest, {
// 	overwrite: luscious.overwrite,
// 	preserveTimestamps: true
// 	}, err => {
// 	if (err) return console.error(err)
// })

// Styles Scaffold
fs.copy( luscious.scaffold.src, luscious.scaffold.dest, {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})



// ------------------------------------
// Setup Files
// ------------------------------------

// Rename/move/copy the Readme
let copyReadme = false;
// Create resources directory if doesn't exist
fs.stat( rsc, function(err, stat) {
	if(err == null) {
		// If dir exists: do nothing
	} else {
		// If dir doesn't exist: create dir
		fs.ensureDir( rsc, err => {
			// console.log(err) // => null
		})
	}
	// Do the readme stuff
	fs.stat( rsc + '/README-fresh.md', function(err, stat) {
		if(err == null) {
			// If file exists: do nothing
		} else {
			// If file doesn't exist
			fs.renameSync('./README.md', rsc + '/README-fresh.md')
			fs.copy( rsc + '/README-template.md', './README.md', {
				overwrite: false,
				preserveTimestamps: true
				}, err => {
					if (err) return console.error(err)
					copyReadme = true; // It will set to true after 'copyReadme' completed successfuly
			})
		}
	})
}) // end: readme task


// ------------------------------------
// Normalize
// ------------------------------------

// Create SASS Version
fs.copy( normalize.src, normalize.dest, {
	overwrite: normalize.overwrite,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})

// Copy CSS Version
fs.copy( normalize.src, normalize.css.dest, {
	overwrite: normalize.overwrite,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})
