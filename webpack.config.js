const baseConfig = require('./webpack.config.base');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const nodeExternals = require('webpack-node-externals');

const webConfig = merge(baseConfig, {
  target: 'web',
  output: {
    libraryTarget: 'umd',
    filename: 'web.js',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '../bundle_analyzer/bundle_sizes.html'
    }),
  ],
});

const nodeConfig = merge(baseConfig, {
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    filename: 'node.js',
  },
  externals: [
    nodeExternals(),
  ],
});

module.exports = [webConfig, nodeConfig];
