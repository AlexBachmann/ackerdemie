"use strict";

var config = require('./config'),
	rename = require('gulp-rename'),
	fs = require('fs'),
	path = require('path'),
	join = path.join;
	
module.exports = function (gulp, plugins, options) {
    return function () {
        gulp.src([config.paths.src + '/app.php'])
        		.pipe(gulp.dest(config.paths.dist));
        fs.createReadStream(join(process.cwd(), config.paths.src, '.htaccess.prod')).pipe(fs.createWriteStream(join(process.cwd(), config.paths.dist, '.htaccess')));
    };
};