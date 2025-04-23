/**
 * Equivalent to the config rules in node.js.
 *
 * We can't use node.js directly because its 'extend' statement won't work
 * when you want to lint this package locally. We therefore need to manually
 * merge its rules into the default ones.
 */
module.exports = require('./node');
