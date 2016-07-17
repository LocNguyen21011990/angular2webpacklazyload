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
        loaders: ['babel', 'awesome-typescript', 'angular2-template'],
        exclude: /node_modules/,
      },
      {
        test: /\.tpl.html/,
        loaders: ['raw'],
      },
      {
        test: /\.jade/,
        loaders: ['pug-html'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]',
      },
      {
        test: /\.scss/,
        loaders: ['raw', 'sass?sourceMaps'],
        include: root('src/app'),
      },
      {
        test: /\.scss/,
        loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap'],
        include: root('src/styles'),
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

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
  },
});
