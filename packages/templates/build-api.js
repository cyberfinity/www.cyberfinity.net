const path = require('path');

const pkgDir = __dirname;

const srcDir = path.join(pkgDir, 'src');
const distDir = path.join(pkgDir, 'dist');
const staticAssetsDir = path.join(pkgDir, '.assets-tmp');

function srcPath(...args) {
  return path.join(srcDir, ...args);
}

function distPath(...args) {
  return path.join(distDir, ...args);
}

const componentsDirname = 'components';
const docsDirname = 'docs';
const previewDirname = 'preview';

module.exports = {
  // Source files
  srcDir,
  srcPath,

  componentsDir: srcPath(componentsDirname),
  docsDir: srcPath(docsDirname),
  previewDir: srcPath(previewDirname),
  previewPath: (...args) => srcPath(previewDirname, ...args),

  // Build output files
  distDir,
  distPath,

  staticAssetsDir,
};
