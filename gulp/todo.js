// Gulpy v0.0.1
//
// - todo
// - todo:clean
// -------------------------------------------------------------------

var g    = require( 'gulp'      );
var todo = require( 'gulp-todo' );
var del  = require( 'del'       );

var op = require(pth.options); // Config

// -------------------------------------------------------------------

// Task Options
var options = {
	customTags: op.todoTags,
	// Modifies output header
	transformHeader: function (kind) {
		return [
			'### ' + kind,
			'| Filename | line # | ' + kind,
			'|:------|:------:|:------'
		]
	}
};


/**
 * Creates a todo-list for your project. Search-files, tags, and output filename are defined in `./gulp.options.js`.
 *
 * @task  {todo}
 * @group {Helper}
 */
g.task('todo', function() {
	return g.src(op.todoFiles)
		.pipe(todo(options))
		.pipe(g.dest(op.todoOutput));
});


/**
 * Removes the todo-list created with `gulp todo`.
 *
 * @task  {todo:clean}
 * @group {Helper}
 */
g.task('todo:clean', function () {
	return del.sync(op.todoOutput);
});
