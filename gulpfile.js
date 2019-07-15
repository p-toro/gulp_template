// Load plugins
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const scss = require('gulp-scss');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function browserSyncStart(done) {
  browserSync.init({
    port: 8080,
    server: {
      baseDir: './build/',
      index: 'index.html',
    },
    reloadOnRestart: true
  });
  done();
};

function browserSyncReload(done) {
  browserSync.reload();
  done();
};

function html() {
  return gulp
    .src('./src/pug/**/!(_)*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./build'))
};

function css() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(scss())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'))
};

function js() {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
};


function watchFiles() {
  gulp.watch('./src/pug/**/*.pug', gulp.series(html, browserSyncReload));
  gulp.watch('./src/scss/**/*.scss', gulp.series(css, browserSyncReload));
  gulp.watch('./src/js/**/*.js', gulp.series(js, browserSyncReload));
};

// define complex tasks
const build = gulp.parallel(html, css, js);
const watch = gulp.parallel(build, watchFiles);
const serve = gulp.parallel(build, watchFiles, browserSyncStart);

// export tasks
exports.html = html;
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.serve = serve;
exports.default = build;
