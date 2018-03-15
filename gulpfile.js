'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('styles', () => {
    return gulp
        .src(['styles/index.scss', 'styles/news.scss'])
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('build', ['styles']);

gulp.task('default', ['build']);
