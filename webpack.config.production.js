const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const { name } = require('./package.json');
const isNetlify = typeof process.env.CONTEXT !== 'undefined';

module.exports = {
  output: {
    filename: 'scripts/[name].[chunkhash].js',
    publicPath: isNetlify ? '/' : `/${name}/`
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
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js(on)?|html|css)$/
    })
  ]
};
