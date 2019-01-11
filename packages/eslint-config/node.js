/**
 *  Cyberfinity ESLint config for Node.js CommonJS modules.
 *
 *  Derived from the main Cyberfinity config, but uses Node.js
 *  require() imports instead of ES6-style ones.
 */
module.exports = {
  extends: '@cyberfinity/eslint-config',
  rules: {
    'import/no-commonjs': false,
    'import/unambiguous': false,
  },
};
