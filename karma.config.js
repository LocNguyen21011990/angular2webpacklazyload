const webpackConfig = require('./webpack.config.js')({ test: true });

module.exports = function karma(karmaConfig) {
  const config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      { pattern: './karma-shim.js', watched: false },
    ],

    preprocessors: {
      './karma-shim.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only',
    },

    webpackServer: {
      noInfo: true,
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: karmaConfig.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
  };

  karmaConfig.set(config);
};
