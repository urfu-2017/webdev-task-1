'use strict';

const del = require('del');
const gulp = require('gulp');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');

gulp.task('compressCss', function () {
    return gulp.src('public/index.css')
        .pipe(concat('public/weather/weather.css'))
        .pipe(concat('public/news/news.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('./public'));
});

gulp.task('compressImages', () =>
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

gulp.task('compress', ['compressImages', 'compressCss']);
gulp.task('default', ['compress']);
