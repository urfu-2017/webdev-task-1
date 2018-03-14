'use strict';

const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const useref = require('gulp-useref');
const del = require('del');

gulp.task('compress', function () {
    return gulp.src('public/index.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./public'));
});

gulp.task('images', () =>
    gulp.src('public/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public'))
);

gulp.task('useref', function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('./'));
});

gulp.task('clean:dist', function () {
    return del.sync('dist');
});
