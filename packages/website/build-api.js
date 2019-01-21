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

module.exports = {
  distDir,
  distPath,
  srcDir,
  srcPath,
  styleDistDir: distPath(styleDirname),
};
