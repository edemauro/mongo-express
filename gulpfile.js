'use strict';

const gulp = require('gulp');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const src = ['*.js', 'lib/**/*.js'];

gulp.task('jscs', () => {
  gulp.src(src)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('lint', () => {
  gulp.src(src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', () => {
  gulp.watch(src, ['jscs', 'lint']);
});

gulp.task('default', ['jscs', 'lint', 'watch']);
