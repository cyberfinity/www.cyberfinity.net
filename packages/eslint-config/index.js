/**
 *  Cyberfinity ESLint config for ES modules.
 *
 *  Derived from Canonical's config, but with a few tweaks.
 *
 *  For linitng Node.js CommonJS files (e.g. build scripts),
 *  use the '@cyberfinity/eslint-config/node' config instead.
 */
module.exports = {
  env: {
    node: true,
  },
  extends: 'eslint-config-canonical',
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'filenames/match-regex': [
      'error',
      '^[a-z][a-z-]+$',
    ],
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
        ],
        'newlines-between': 'always',
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      },
    ],
    'no-restricted-syntax': 0,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never',
      },
    ],
  },
};
