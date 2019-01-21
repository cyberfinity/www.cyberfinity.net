const gulp = require('gulp');
const shell = require('gulp-shell');
const del = require('del');
const uiBldPaths = require('@cyberfinity/www-ui/build-api');

const bldPaths = require('./build-api');

// Clean dist dir
function clean() {
  return del([
    bldPaths.distPath('*')
  ]);
}


function copyUiAssets() {
  return gulp.src(uiBldPaths.distPath('**', '*'))
    .pipe(gulp.dest(bldPaths.styleDistDir));
}


function watchUiAssets(done) {
  gulp.watch(
    uiBldPaths.distPath('**', '*'),
    copyUiAssets,
  );
  done();
}


const buildSite = shell.task('eleventy');
buildSite.displayName = 'build:site';

const serveSite = shell.task('eleventy --serve');
serveSite.displayName = 'serve:site';

const build = gulp.parallel(buildSite, copyUiAssets);

const start = gulp.series(
  copyUiAssets,
  gulp.parallel(
    serveSite,
    watchUiAssets
  )
);

module.exports = {
  build,
  clean,
  start,
};
