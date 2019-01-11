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

// SASS stuff
const sassDirname = 'sass';
const sassMainFilename = 'index.scss';

// CSS stuff
const cssDirname = 'css';
const cssFilebase = 'style';


module.exports = {
  cssDir: distPath(cssDirname),
  cssFile: distPath(cssDirname, cssFilebase),
  cssFilebase,
  distDir,
  distPath,
  sassMainFile: srcPath(sassDirname, sassMainFilename),
  sassPath: (...args) => {
    return srcPath(sassDirname, ...args);
  },
  srcDir,
};
