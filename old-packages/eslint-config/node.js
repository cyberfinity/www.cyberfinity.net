/**
 *  Cyberfinity ESLint config for Node.js CommonJS modules.
 *
 *  Derived from the main Cyberfinity config, but uses Node.js
 *  require() imports instead of ES6-style ones.
 */
const mainConfig = require('.');

const nodeConfig = {...mainConfig};

nodeConfig.rules = {
  ...nodeConfig.rules,
  ...{
    'import/no-commonjs': 0,
    'import/unambiguous': 0,
  },
};

module.exports = nodeConfig;
