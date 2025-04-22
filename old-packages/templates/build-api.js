const path = require('path');

const pkgDir = __dirname; // eslint-disable-line id-match

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
const assetsDirname = 'assets';
const patternLibraryDirname = 'pattern-library';
const templatesDirname = 'templates';

const sassMainFilename = 'preview.scss';

function previewPath(...args) {
  return srcPath(previewDirname, ...args);
}

module.exports = {
  assetsDirname,
  componentsDir: srcPath(componentsDirname),
  distDir,
  distPath,
  distPatternLibraryDir: distPath(patternLibraryDirname),
  distTemplatesDir: distPath(templatesDirname),
  docsDir: srcPath(docsDirname),
  previewDir: srcPath(previewDirname),
  previewDirname,
  previewPath,
  sassMainFile: previewPath(sassMainFilename),
  srcDir,
  srcPath,
  staticAssetsDir,
  staticAssetsPath: (...args) => {
    return path.join(staticAssetsDir, ...args);
  },
};
