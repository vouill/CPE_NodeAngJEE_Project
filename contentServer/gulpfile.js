'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');

var nodemon =require('gulp-nodemon');

/* define default tast, it starts nodemon and the watchers */
gulp.task('default', ['start', 'jade', 'sass']);

gulp.task('start', ['jade:watch', 'sass:watch'], function () {
  nodemon({
    script: 'app.js'
  , ext: 'js'
  , env: { 'NODE_ENV': 'development' }
  })
});

/* compile jade */
gulp.task('jade', function() {
  gulp.src('public/src/**/*.jade')
  .pipe(jade({locals: {}})).pipe(gulp.dest('public/dist/'));
});

/* compile sass */
gulp.task('sass', function () {
  gulp.src('public/src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/dist/css'));
});

/* watch jade sass */
gulp.task('jade:watch', function() {
  gulp.watch('public/src/**/*.jade', ['jade']);
});

/* watch sass changes */
gulp.task('sass:watch', function () {
  gulp.watch('public/src/**.*.sass', ['sass']);
});
