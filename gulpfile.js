var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var gutil = require('gulp-load-utils')(['log']);


var paths = {
    css: 'css/*.css',
    js: 'jsck/*.js'
};


gulp.task('css', function () {
  // place code for your default task here
    gulp.src(paths.css)
        .pipe(watch(function (files) {
            gutil.log('Recompiling css');
            return files.pipe(prefix("last 3 version", "> 1%", "ie 8", "ie 7", "Firefox ESR"))
                .pipe(gulp.dest('./final/'));
        }));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['css']);
