var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cleanCss = require('gulp-clean-css'),
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
  gulp.watch(['./app/components/**/*.scss', './assets/scss/reset.scss'], ['sass']);
});

gulp.task('build', function() {
  gulp.src(['app/app.js', 'app/**/*.js'])
    .pipe(concat('grapeviin.js'))
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        }
    }))
    .pipe(gulp.dest('public/js'));

  gulp.src(['app/components/**/*.html'])
    .pipe(gulp.dest('public/html'));
});