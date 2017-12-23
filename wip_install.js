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

// Fresh Scaffold
var scaffold = {
	src: './dependencies/fresh-scaffold'
}

// Gulpy
var gulpy = {
	src: './dependencies/gulpy',
	dest: './dependencies/gulpy',
	overwrite: true
}

// Luscious Sass
var luscious = {
	src: './dependencies/luscious-sass',
	// dest: './dependencies/luscious_sass',
	overwrite: true,
	scaffold: {
		src: './dependencies/luscious-sass/__rsc__/styles_scaffold',
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
// Setup Gulpy
// ------------------------------------

// Copy gulpfile.js
fs.copy( gulpy.src + '/gulpfile.js', './gulpfile.js', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})

// TEMP
// Copy gulp.options
fs.copy( gulpy.src + '/gulp.options.js', './gulp.options.js', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})

// Copy Gulpy tasks
// fs.copy( gulpy.src + '/gulp', gulpy.dest, {
// 	overwrite: gulpy.overwrite,
// 	preserveTimestamps: true
// 	}, err => {
// 	if (err) return console.error(err)
// })


// ------------------------------------
// Setup Dev Scaffold
// ------------------------------------

// Dev files
fs.copy( scaffold.src + '/dev', './dev', {
	overwrite: false,
	preserveTimestamps: true
	}, err => {
	if (err) return console.error(err)
})

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
	fs.stat( rsc + '/README_fresh.md', function(err, stat) {
		if(err == null) {
			// If file exists: do nothing
		} else {
			// If file doesn't exist
			fs.renameSync('./README.md', rsc + '/README_fresh.md')
			fs.copy( scaffold.src + '/rootfiles/README.md', './README.md', {
				overwrite: false,
				preserveTimestamps: true
				}, err => {
					if (err) return console.error(err)
					copyReadme = true; // It will set to true after 'copyReadme' completed successfuly
			})
		}
	})
}) // end: readme task

// Copy Rootfiles
fs.readdir( scaffold.src +'/rootfiles', (err, files) => {
	if(err) return console.error(err)
	files.forEach( file => {
		// If file is README.md then check completion of 'copyReadme'
		if(file === 'README.md'){
			if(!copyReadme){
				return;
			}
		}
		fs.copy( scaffold.src +'/rootfiles/'+file, './'+file, {
		overwrite: false,
		preserveTimestamps: true,
		}, err => {
			if (err) return console.error(err)
		})
	} )
});


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
