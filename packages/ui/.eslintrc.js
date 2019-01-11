module.exports = {
  extends: 'eslint-config-canonical',
  parserOptions: {
    ecmaVersion: 2017
  },
  env: {
    node: true
  },
  rules:{
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'filenames/match-regex': [
      'error',
      "^[a-z][a-z-]+$",
    ],
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true,
      },
    ],
    'import/no-commonjs': false,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal'
        ],
        'newlines-between': 'always'
      }
    ],
    'import/unambiguous': false,
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  }
};
