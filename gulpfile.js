'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const svgo = require('gulp-svgo');

gulp.task('css', function () {
    return gulp.src('./public-src/stylus/**.styl')
        .pipe(stylus())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('images', () => {
    return gulp.src('./public-src/images/*')
        .pipe(svgo())
        .pipe(gulp.dest('./public/images/'));
});

gulp.task('default', ['css', 'images']);
