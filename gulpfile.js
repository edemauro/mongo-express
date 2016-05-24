'use strict';

const gulp = require('gulp');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const header = require('gulp-header');
const babel = require('gulp-babel');
const paths = {
  serverFiles: ['*.js', 'lib/**/*.js'],
  angularFiles: ['app/**/*.js'],
  angularHTML: ['app/**/*.html']
};
const headerMessage = 'This is a compiled file. DO NOT EDIT.';

gulp.task('jscs', () => {
  return gulp.src(paths.serverFiles)
    .pipe(plumber())
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('lint', () => {
  return gulp.src(paths.serverFiles)
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('babel', () => {
  return gulp.src(paths.angularFiles)
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(header('// ${headerMessage}\n', { headerMessage: headerMessage }))
    .pipe(gulp.dest('public/angular/'));
});

gulp.task('copy views', () => {
  return gulp.src(paths.angularHTML)
    .pipe(gulp.dest('public/angular/'));
});

gulp.task('nodemon', () => {
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ],
    ext: 'js html'
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.serverFiles, ['jscs', 'lint']);
  gulp.watch(paths.angularFiles, ['babel']);
  gulp.watch(paths.angularHTML, ['copy views']);
});

gulp.task('default', ['babel', 'copy views', 'nodemon', 'watch']);
