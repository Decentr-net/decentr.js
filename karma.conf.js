const webpackConfig = require('./webpack.config.spec.js');

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'src/**/*.spec.ts',
    ],

    preprocessors: {
      '**/*.ts': ['webpack'],
    },

    reporters: ['dots'],

    browsers: ['Chrome'],

    singleRun: true,

    mime: {
      'text/x-typescript': ['ts','tsx'],
    },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
    },
  })
}
