const gulp = require('gulp');
const del = require('del');

const bldPaths = require('./build-api');

// Clean dist dir
function clean() {
  return del(bldPaths.distPath('*'));
}


module.exports = {
  clean,
};
