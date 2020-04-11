const path = require('path');

const pkgDir = __dirname; // eslint-disable-line id-match

const srcDir = path.join(pkgDir, 'src');
const distDir = path.join(pkgDir, 'dist');

function srcPath(...args) {
  return path.join(srcDir, ...args);
}

function distPath(...args) {
  return path.join(distDir, ...args);
}

const styleDirname = 'style';
const srcTemplateDirname = '_templates';
const srcDataDirname = '_data';

module.exports = {
  distDir,
  distPath,
  srcDataDirname,
  srcDir,
  srcPath,
  srcTemplateDirname,
  styleDistDir: distPath(styleDirname),
};
