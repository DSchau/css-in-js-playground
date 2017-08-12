const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function webpackConfig() {
  return {
    devtool: 'cheap-module-eval-source-map',
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
          enforce: 'pre',
          test: /\.js$/,
          use: 'source-map-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ],
    externals: {
      React: 'react',
      ReactDOM: 'react-dom'
    }
  }
};
