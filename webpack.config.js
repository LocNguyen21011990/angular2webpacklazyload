const HTMLWebpackPlugin = require('html-webpack-plugin');
const { root, stripUnused, only } = require('./helpers');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => ({
  context: root('./src'),
  resolve: {
    extensions: ['', '.js', '.ts'],
  },
  entry: {
    polyfill: './polyfill.ts',
    vendor: './vendor.ts',
    app: './browser.bootstrap.ts',
  },

  output: {
    filename: '[name].bundle.js',
    path: root('./dist'),
    pathinfo: !env.prod, // should include path name comment for every import
  },

  devtool: env.prod ? 'source-map' : 'eval',
  bail: env.prod, // abort compilation on first error
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript', 'angular2-template'],
        exclude: /node_modules/,
      },
      {
        test: /\.tpl.html/,
        loaders: ['raw'],
      },

      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract('style', 'css?sourceMaps'),
      //   exclude: root('./src/app'),
      // },
      {
        test: /\.scss/,
        loaders: ['raw', 'sass?sourceMaps'],
      },
    ],
  },

  plugins: stripUnused([

    // new ExtractTextPlugin('[name].css'),

    new HTMLWebpackPlugin({
      template: './index.html',
    }),

    only(env.prod, new webpack.optimize.UglifyJsPlugin),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfill'],
    }),
  ]),
});
