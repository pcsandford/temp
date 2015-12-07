var gulp = require('gulp');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function(){
  gulp.src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/'))
    .pipe(reload({stream:true}))
});

gulp.task('scripts', function(){
  gulp.src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build/scripts'))
});

gulp.task('watch', function() {
  gulp.watch('src/scss/style.scss', ['styles']);
  gulp.watch('src/scripts/*.js', ['scripts']);
})

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: "."
    }
  });
});

gulp.task('default', ['styles', 'scripts', 'watch', 'browser-sync']);