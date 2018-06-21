var path = require('path');
var webpack = require('webpack');
var sassLoader = 'style!css!sass?sourceMap=true&sourceMapContents=true';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './demo/app.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)?$/,
      include: [
        path.resolve(__dirname, 'lib'),
        path.resolve(__dirname, 'demo'),
      ],
      loaders: ['react-hot', 'babel'],
    },
    {
        test: /\.scss$/,
        include: [
            path.resolve(__dirname, 'lib'),
            path.resolve(__dirname, 'demo'),
        ],
        loader: sassLoader
    },
    {
        test: /\.css$/,
        include: [
            path.resolve(__dirname, 'lib'),
            path.resolve(__dirname, 'demo'),
        ],
        loader: 'style!css'
    }],
  },
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react'),
      'Tabs': path.join(__dirname, 'lib', 'tabs/Index'),
      'TabPane': path.join(__dirname, 'lib', 'tabs/TabPane'),
      'Layout': path.join(__dirname, 'lib', 'layout/Index'),
    },
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
};
