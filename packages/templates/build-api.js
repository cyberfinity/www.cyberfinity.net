const path = require('path');

const pkgDir = __dirname;

const srcDir = path.join(pkgDir, 'src');
const distDir = path.join(pkgDir, 'dist');

function srcPath(...args) {
  return path.join(srcDir, ...args);
}

function distPath(...args) {
  return path.join(distDir, ...args);
}

module.exports = {
  // Source files
  srcDir,
  srcPath,

  // Build output files
  distDir,
  distPath,
};
