// generate babel config that is only used by jest, but not meteor
module.exports = require('babel-jest').createTransformer({
  presets: ['react', 'es2015', 'stage-0'],
});