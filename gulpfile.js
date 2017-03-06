var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    cleanCss = require('gulp-clean-css'),n
    concat = require('gulp-concat'),
    minify = require('gulp-minify');

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./assets/scss/style.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./public/css/'))
    .pipe(cleanCss({compatibility: '*'}))
    .pipe(rename({ extname: '.min.css'}))
    .pipe(gulp.dest('./public/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(['./app/pages/**/*.scss', './assets/scss/_reset.scss'], ['sass']);
});

gulp.task('build', function() {
  gulp.src(['app/app.js', 'app/**/*.js'])
    .pipe(replace('app/pages','public/html'))
    .pipe(concat('grapeviin.js'))
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest('public/js'));

  gulp.src(['app/pages/**/*.html'])
    .pipe(gulp.dest('public/html'));
});