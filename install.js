// Fresh
// @since v3.0.2
//
// Automates project setup with dependencies
// ------------------------------------------------------------------
// TODO: Add/Get path variables from gulpfile.js
// TODO: Move luscious to public repo and it in package.json

const fs = require('fs-extra')


// ------------------------------------
// Dependency Paths
// ------------------------------------

// Luscious Sass
var luscious = {
	src: './node_modules/luscious-sass',
	dest: './dependencies/luscious-sass',
	overwrite: true
}

var scaffold = {
	src: luscious.src + '/scaffold',
	dest: './src/sass'
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

// Core
fs.copy(luscious.src, luscious.dest, {
	overwrite: luscious.overwrite,
	preserveTimestamps: true
}, err => {
	if (err) return console.error(err)
})

// Scaffold
fs.copy(scaffold.src, scaffold.dest, {
	overwrite: false, // TODO: figure out how to overwrite only on initial install
	preserveTimestamps: true
}, err => {
	if (err) return console.error(err)
})


// ------------------------------------
// Normalize
// ------------------------------------

// Create SASS Version
fs.copy(normalize.src, normalize.dest, {
	overwrite: normalize.overwrite,
	preserveTimestamps: true
}, err => {
	if (err) return console.error(err)
})

// Copy CSS Version
fs.copy(normalize.src, normalize.css.dest, {
	overwrite: normalize.overwrite,
	preserveTimestamps: true
}, err => {
	if (err) return console.error(err)
})
