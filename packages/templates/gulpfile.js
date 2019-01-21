const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uiBldPaths = require('@cyberfinity/www-ui/build-api');

const bldPaths = require('./build-api');
const fractal = require('./fractal');

// Clean dist dir
function clean() {
  return del([
    bldPaths.distPath('*'),
    bldPaths.staticAssetsDir,
  ]);
}

// keep a reference to the fractal CLI console utility
const logger = fractal.cli.console;

/*
 * Start the Fractal server
 *
 * In this example we are passing the option 'sync: true' which means that it will
 * use BrowserSync to watch for changes to the filesystem and refresh the browser automatically.
 * Obviously this is completely optional!
 *
 * This task will also log any errors to the console.
 */
async function startPatternLibrary() {
  const server = fractal.web.server({
    sync: true,
  });

  server.on('error', (err) => {
    return logger.error(err.message);
  });

  await server.start();
  logger.success(`Fractal server is now running at ${server.url}`);
  logger.success(`Network URL: ${server.urls.sync.external}`);
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
async function buildPatternLibrary() {
  const builder = fractal.web.builder();

  builder.on('progress', (completed, total) => {
    return logger.update(`Exported ${completed} of ${total} items`, 'info');
  });
  builder.on('error', (err) => {
    return logger.error(err.message);
  });

  await builder.build();
  logger.success('Fractal build completed!');
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
  return gulp.src(bldPaths.previewPath(bldPaths.assetsDirname, '**', '*'))
    .pipe(gulp.dest(bldPaths.staticAssetsPath(bldPaths.previewDirname, bldPaths.assetsDirname)));
}


function watchPreviewAssets(done) {
  gulp.watch(
    bldPaths.previewPath(bldPaths.assetsDirname, '**', '*'),
    copyPreviewAssets
  );
  done();
}


// Build CSS from SASS
function buildPreviewCss() {
  return gulp.src(bldPaths.sassMainFile)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        uiBldPaths.sassPath()
      ]
    }))
    .pipe(rename({
      dirname: bldPaths.previewDirname,
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(bldPaths.staticAssetsDir));
}


// Watch SASS sources and rebuild CSS on changes
function watchPreviewSass(done) {
  gulp.watch(
    bldPaths.previewPath('**', '*.scss'),
    buildPreviewCss
  );
  done();
}


const copyAssets = gulp.parallel(
  copyUiAssets,
  buildPreviewCss,
  copyPreviewAssets
);

const build = gulp.series(copyAssets, buildPatternLibrary);


const start = gulp.series(copyAssets, gulp.parallel(
  watchUiAssets,
  watchPreviewSass,
  watchPreviewAssets,
  startPatternLibrary
));

module.exports = {
  build,
  clean,
  start,
};
