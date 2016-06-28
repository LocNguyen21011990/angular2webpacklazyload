const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = (env) => ({
  context: resolve(__dirname, './src'),
  entry: {
    polyfill: './polyfill.ts',
    vendor: './vendor.ts',
    app: './browser.bootstrap.ts',
  },

  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, './dist'),
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
        loaders: ['babel', 'awesome-typescript'],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: stripUnused([
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    env.test ? undefined : new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfill',
    }),
  ]),
});

function stripUnused(array) {
  return array.filter(it => !!it);
}
