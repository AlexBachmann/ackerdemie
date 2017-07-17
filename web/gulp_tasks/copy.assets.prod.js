"use strict";

var config = require('./config'),
	rename = require('gulp-rename');
	
module.exports = function (gulp, plugins, options) {
    return function () {
        gulp.src([config.paths.src + '/app.php'])
        		.pipe(gulp.dest(config.paths.dist));
        return gulp.src([config.paths.src + '/.htaccess.prod'])
        		.pipe(rename('.htaccess'))
        		pipe(gulp.dest(config.paths.dist));
    };
};