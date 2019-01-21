const bldPaths = require('./build-api');

module.exports = {
  dir: {
    input: bldPaths.srcDir,
    output: bldPaths.distDir,
  },
};
