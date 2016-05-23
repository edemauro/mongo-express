'use strict';

const gulp = require('gulp');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');
const liveReload = require('gulp-livereload');
const babel = require('gulp-babel');
const src = ['*.js', 'lib/**/*.js'];
const angularFiles = ['front_end/core/**/*.js'];

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

gulp.task('lr', () => {
  liveReload.listen();
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
  })
  .on('restart', () => {
    gulp.src('app.js')
      .pipe(liveReload());
  });
});

gulp.task('babel', () => {
  gulp.src(angularFiles)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('public/javascripts/angular/'));
});

gulp.task('watch', () => {
  gulp.watch(src, ['jscs', 'lint']);
  gulp.watch(angularFiles, ['babel']);
});

gulp.task('default', ['jscs', 'lint', 'babel', 'lr', 'nodemon', 'watch']);
