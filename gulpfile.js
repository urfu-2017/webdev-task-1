'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('scss', function () {
    gulp.src('./scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public'));
});
