'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const browserSync = require('browser-sync');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const nodemon = require('gulp-nodemon');

gulp.task('stylus', function () {
    return gulp.src('front_src/stylus/*.styl')
        .pipe(stylus({
            'include css': true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: 'http://localhost:8080',
        files: ['public/**/*.*'],
        port: 7000
    });
});

gulp.task('img', function () {
    return gulp.src('front_src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('public/img'));
});

gulp.task('watch', ['browser-sync', 'build'], function () {
    gulp.watch('front_src/stylus/*.styl', ['stylus']);
    gulp.watch('views/**/*.hbs', browserSync.reload);
    gulp.watch('front_src/js/**/*.js', browserSync.reload);
});

gulp.task('html', function () {
    gulp.src('front_src/**/*.html')
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({ stream: true }));
});

/* eslint-disable */
gulp.task('build', ['clean', 'img', 'stylus'], function () {
    const buildCss = gulp.src([
        'public/css/main.css',
        'public/css/libs.min.css'
    ])
        .pipe(gulp.dest('public/css'));

    const buildFonts = gulp.src('front_src/fonts/**/*')
        .pipe(gulp.dest('public/fonts'));

    const buildJs = gulp.src('front_src/js/**/*')
        .pipe(gulp.dest('public/js'));

    const buildHtml = gulp.src('front_src/*.html')
        .pipe(gulp.dest('public'));
});
/* eslint-enable */

gulp.task('clean', function () {

    return del.sync('public');
});

gulp.task('default', ['watch']);

gulp.task('clear', function () {

    return cache.clearAll();
});

gulp.task('nodemon', function (cb) {

    let started = false;

    return nodemon({
        script: 'index.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});
