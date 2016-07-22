const HTMLWebpackPlugin = require('html-webpack-plugin');
const { root, stripUnused, only } = require('./helpers');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => ({
  context: root('./src'),
  resolve: {
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['node_modules'],
    alias: {
      app: root('src/app'),
    },
  },
  entry: {
    polyfill: './polyfill.ts',
    vendor: './vendor.ts',
    app: './browser.bootstrap.ts',
  },

  output: {
    path: root('./dist'),
    filename: '[name].bundle.js',
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
        loaders: ['html'],
      },
      {
        test: /\.jade/,
        loaders: [
          'html',
          'pug-html?pretty&' + JSON.stringify({ doctype: 'html' }),
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: stripUnused([
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          only(env.prod, 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'),
        ]),
      },
      {
        test: /\.scss/,
        loaders: ['to-string', 'css', 'resolve-url', 'sass?sourceMaps'],
        include: root('src/app'),
      },
      {
        test: /\.scss/,
        loaders: ExtractTextPlugin.extract(['css', 'resolve-url', 'sass?sourceMap']),
        include: root('src/styles'),
      },
    ],
  },

  plugins: stripUnused([

    new ExtractTextPlugin('[name].css'),

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
