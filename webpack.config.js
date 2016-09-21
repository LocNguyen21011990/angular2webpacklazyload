const HTMLWebpackPlugin = require('html-webpack-plugin');
const { root, stripUnused, only } = require('./helpers');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = (env) => ({
  context: root('./src'),
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      root('src'),
      'node_modules',
    ],
  },
  entry: !env.test ? {
    polyfill: './polyfill.ts',
    vendor: './vendor.ts',
    app: './browser.bootstrap.ts',
  } : undefined,

  output: {
    path: root('./dist'),
    filename: '[name].bundle.js',
    pathinfo: !env.prod, // should include path name comment for every import
  },

  devtool: env.prod ? 'source-map' : 'eval-source-map',
  bail: env.prod, // abort compilation on first error
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript', 'angular2-template'],
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
          `pug-html?pretty&${JSON.stringify({ doctype: 'html' })}`,
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

  plugins: !env.test ? stripUnused([
    new ExtractTextPlugin('[name].css'),
    /*
    from https://github.com/angular/angular/issues/11580
    */
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root('./src') // location of your src
    ),
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    only(env.prod, new webpack.optimize.UglifyJsPlugin),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfill'],
      minChunks: Infinity,
    }),
    only(env.prod, new webpack.LoaderOptionsPlugin({
      debug: false,
    })),
    only(env.prod, new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    })),
    new ForkCheckerPlugin(),
  ]) : [],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    aggregateTimeout: 300,
    poll: 1000,
  },
});
