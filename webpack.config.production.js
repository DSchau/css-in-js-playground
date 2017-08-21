const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');

module.exports = {
  output: {
    filename: 'scripts/[name].[chunkhash].js',
    publicPath: '/jss-playground'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        include: [path.join(__dirname, 'node_modules')]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      sourceMap: true
    }),
    new ExtractTextPlugin('vendor.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity
    }),
    new NameAllModulesPlugin(),
    new OfflinePlugin({
      ServiceWorker: {
        events: true
      }
    })
  ]
};
