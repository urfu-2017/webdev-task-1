'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

module.exports = () => {
    gulp.src('./scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public'));
};
