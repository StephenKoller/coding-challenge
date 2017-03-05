var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./assets/scss/style.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./assets/css/'))
    .pipe(cleanCss({compatibility: '*'}))
    .pipe(rename({ extname: '.min.css'}))
    .pipe(gulp.dest('./assets/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(['./app/components/**/*.scss', './assets/scss/reset.scss'], ['sass']);
});