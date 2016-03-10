'use strict';

var nodemon = require('nodemon');
var clean = require('gulp-clean');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');
var isWin = /^win/.test(process.platform);

gulp.task('unit:watch', function () {
  return gulp.watch(['tests/unit/**/*.js', '*.js'], ['unit']);
});

gulp.task('unit', function () {
  return gulp.src([
      'index.js',
      'tests/unit/**/*.js'
    ], {
      read: false
    })
    .pipe(shell(isWin ? 'cls' : 'clear'))
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('unit:run', ['unit', 'unit:watch'], () => {});

gulp.task('server:back:watch', callback => {
  nodemon({
    script: './index.js',
    watch: '.',
    ext: 'js'
  });

  setTimeout(callback, 2000)
});

gulp.task('server:back:unit', ['unit:run']);
