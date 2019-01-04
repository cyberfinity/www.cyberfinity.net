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

const componentsDirname = 'components';
const docsDirname = 'docs';
const staticAssetsDirname = 'assets';

module.exports = {
  // Source files
  srcDir,
  srcPath,

  componentsDir: srcPath(componentsDirname),
  docsDir: srcPath(docsDirname),

  // Build output files
  distDir,
  distPath,

  staticAssetsDir: distPath(staticAssetsDirname),
};
