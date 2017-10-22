// Gulpy v0.0.1
//
// -------------------------------------------------------------------

var gulp = require('gulp');
var usage = require('gulp-help-doc');

// -------------------------------------------------------------------


/**
 * Prints this help usage
 *
 * at~task {help}
 * at~order {21}
 */
gulp.task('help', function() { return usage(gulp); });

gulp.task('info', ['help']);
