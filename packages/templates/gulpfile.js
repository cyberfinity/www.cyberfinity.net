const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const uiBldPaths = require('@cyberfinity/www-ui/build-api');

const bldPaths = require('./build-api');
const fractal = require('./fractal');

// Clean dist dir
function clean() {
  return del([
    bldPaths.distPath('*'),
    bldPaths.staticAssetsDir
  ]);
}


const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */
function startPatternLibrary(){
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
      logger.success(`Fractal server is now running at ${server.url}`);
  });
}
startPatternLibrary.displayName = 'fractal:start';


/*
 * Run a static export of the project web UI.
 *
 * This task will report on progress using the 'progress' event emitted by the
 * builder instance, and log any errors to the terminal.
 *
 * The build destination will be the directory specified in the 'builder.dest'
 * configuration option set above.
 */
function buildPatternLibrary(){
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
      logger.success('Fractal build completed!');
  });
}
buildPatternLibrary.displayName = 'fractal:build';



function copyUiAssets() {
  return gulp.src(uiBldPaths.distPath('**', '*'))
    .pipe(gulp.dest(bldPaths.staticAssetsDir));
}


function watchUiAssets(done) {
  gulp.watch(
    uiBldPaths.distPath('**', '*'),
    copyUiAssets
  );
  done();
}


function copyPreviewAssets() {
  return gulp.src(bldPaths.previewPath('**', '*'))
    .pipe(rename({
      dirname: 'preview'
    }))
    .pipe(gulp.dest(bldPaths.staticAssetsDir));
}


function watchPreviewAssets(done) {
  gulp.watch(
    bldPaths.previewPath('**', '*'),
    copyPreviewAssets
  );
  done();
}


const copyAssets = gulp.parallel(
  copyUiAssets,
  copyPreviewAssets
);

const build = gulp.series(copyAssets, buildPatternLibrary);


const start = gulp.series(copyAssets, gulp.parallel(
  watchUiAssets,
  watchPreviewAssets,
  startPatternLibrary
));

module.exports = {
  clean,
  build,
  start
};
