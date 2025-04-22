const http = require('http');
const gulp = require('gulp');
const shell = require('gulp-shell');
const del = require('del');
const uiBldPaths = require('@cyberfinity/www-ui/build-api');

const bldPaths = require('./build-api');

const browserSyncPort = 8080;

// Clean dist dir
function clean() {
  return del([
    bldPaths.distPath('*')
  ]);
}


function reloadBrowser(done) {
  const url = `http://localhost:${browserSyncPort}/__browser_sync__?method=reload`;

  http.get(url, (resp) => {
    resp.on('data',() => {});
    resp.on('end', () => {
      done();
    });
  }).on('error', (err) => {
    done(err);
  });
}


function copyUiAssets() {
  return gulp.src(uiBldPaths.distPath('**', '*'))
    .pipe(gulp.dest(bldPaths.styleDistDir));
}


function watchUiAssets(done) {
  gulp.watch(
    uiBldPaths.distPath('**', '*'),
    gulp.series(
      copyUiAssets,
      reloadBrowser,
    ),
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
