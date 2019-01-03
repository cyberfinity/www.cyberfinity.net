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

// SASS stuff
const sassDirname = 'sass';
const sassMainFilename = 'index.scss';

// CSS stuff
const cssDirname = 'css';
const cssFilebase = 'style';


module.exports = {
  // Source files
  srcDir,

  sassPath: (...args) => srcPath(sassDirname, ...args),
  sassMainFile: srcPath(sassDirname, sassMainFilename),

  // Build output files
  distDir,
  distPath,

  cssDir: distPath(cssDirname),
  cssFilebase,
  cssFile: distPath(cssDirname, cssFilebase),
};
