const path = require('path');
const webpack = require('webpack');
const assign = require('webpack-config-assign');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function webpackConfig({ environment = 'production' } = {}) {
  const base = {
    devtool: 'source-map',
    entry: {
      bundle: ['./src/index']
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json', '.']
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'source-map-loader'
        },
        {
          test: /\.tsx?$/,
          use: 'awesome-typescript-loader',
          include: [path.join(__dirname, 'src')]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [path.join(__dirname, 'node_modules')]
        },
        {
          test: /\.js$/,
          use: ['raw-loader'],
          include: [path.join(__dirname, 'src/snippets')]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(environment)
      })
    ],
    externals: {
      React: 'react',
      ReactDOM: 'react-dom'
    }
  };

  return assign(base, require(`./webpack.config.${environment}`));
};
