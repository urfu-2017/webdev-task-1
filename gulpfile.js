'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');

gulp.task('copy-imgs', function () {
    return gulp.src('./public/images/*')
        .pipe(gulp.dest('./bundle'));
});

gulp.task('css', function () {
    return gulp.src('./public/*.styl')
        .pipe(stylus())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./bundle/'));
});

gulp.task('watch-stylus', function () {
    return gulp.watch('./public/*.styl', ['css']);
});

gulp.task('default', ['css', 'copy-imgs']);
