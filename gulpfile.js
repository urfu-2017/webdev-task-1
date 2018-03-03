'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');

function buildCss() {
    return gulp.src('./public/*.styl')
        .pipe(stylus())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./bundle/'));
}
gulp.task('copy-imgs', function () {
    return gulp.src('./public/images/*')
        .pipe(gulp.dest('./bundle'));
});

gulp.task('css', function () {
    return buildCss();
});

gulp.task('watch-stylus', function () {
    return gulp.watch('./public/*.styl', ['css']);
});

gulp.task('pack', ['css', 'copy-imgs']);
