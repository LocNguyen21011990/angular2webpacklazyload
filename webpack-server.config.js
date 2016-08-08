const { checkNodeImport, root } = require('./helpers');
const { moduleConfigs } = require('./webpack.config');

const serverConfig = {
  target: 'node',
  entry: './src/server',
  output: {
    path: root('dist/server'),
    libraryTarget: 'commonjs2',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    modules: [
      root('src'),
      'node_modules',
    ],
  },
  externals: checkNodeImport,

  module: moduleConfigs({}),

  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true,
  },
};

module.exports = serverConfig;
