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



// 5. Rename the cloned readme
// Goal: Rename the included readme file so that it stays in the repo for
// reference. Need to set this up so that it only runs this task on the
// initial install. I guess the best way to do that would be to skip the
// task if there's already a 'README_fresh.md' in the root?
//
// This task and #6 throws an error if you run `yarn install` again after
// the initial install.



// fs.move('./README.md', './README_fresh.md', {
// 	overwrite: false
// 	}, err => {
// 	if (err) return console.error(err)
// })


// fs.stat('./README.md', function(err, stat) {
// 	if(err == null) {
// 		console.log('File exists');
// 	} else {
// 		console.log('File does not exist');
// 	}
// });





fs.stat('./README_fresh.md', function(err, stat) {
	if(err == null) {
		// If file exists: do nothing
	} else {
		// If file doesn't exist: Rename it and copy the template file
		
		fs.renameSync('./README.md', './README_fresh.md')
		
		fs.copy( node.scaffoldD + '/rootfiles/README.md', './README.md', {
			overwrite: false,
			preserveTimestamps: true
			}, err => {
				if (err) return console.error(err)
		})
	}
});




// 6. Copy dev files templates into the project
// Goal: Copy all the files from 'node_modules/fresh-scaffold/rootfiles' to the
// project root. Need to set it up so that it ignores the README.md file if
// the rename readme task isn't run (see #5)


fs.copy( node.scaffoldD + '/rootfiles', './', {
	overwrite: true,
	preserveTimestamps: true
	}, err => {
		if (err) return console.error(err)
})
