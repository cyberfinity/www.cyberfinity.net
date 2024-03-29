const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const del = require('del');

const bldPaths = require('./build-api');

sass.compiler = require('sass');

// Clean dist dir
function clean() {
  return del(bldPaths.distPath('*'));
}


// Build CSS from SASS
function buildCss() {
  return gulp.src(bldPaths.sassMainFile)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(rename({
      basename: bldPaths.cssFilebase,
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(bldPaths.cssDir));
}


// Watch SASS sources and rebuild CSS on changes
function watchSass(done) {
  gulp.watch(
    bldPaths.sassPath('**', '*.scss'),
    buildCss,
  );
  done();
}


// Copy images
function optimiseImages() {
  return gulp.src(bldPaths.imageDir('**', '*.{gif,png,jpg,svg}'))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: false,
          },
          {
            removeDimensions: true,
          },
        ],
      }),
    ], {
      verbose: true,
    }))
    .pipe(gulp.dest(bldPaths.distPath(bldPaths.imageDirname)));
}

// Watch image sources and copy on changes
function watchImages(done) {
  gulp.watch(
    bldPaths.imageDir('**', '*'),
    optimiseImages,
  );
  done();
}


// Build all the things!
const build = gulp.parallel(buildCss, optimiseImages);

// Warch all the things!
const watch = gulp.series(build, gulp.parallel(
  watchSass,
  watchImages,
));


module.exports = {
  build,
  clean,
  default: build,
  watch,
};
