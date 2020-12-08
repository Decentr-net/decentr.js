const baseConfig = require('./webpack.config.base');
const { merge } = require('webpack-merge');

module.exports = merge(baseConfig, {
  target: 'web',
  output: {
    libraryTarget: 'umd',
    filename: 'web.js',
  },
});
