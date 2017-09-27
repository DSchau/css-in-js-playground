const path = require('path');
const webpack = require('webpack');
const assign = require('webpack-config-assign');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function webpackConfig({ environment = 'production' } = {}) {
  const base = {
    devtool: 'source-map',
    entry: {
      bundle: ['./src/index'],
      vendor: ['react', 'react-dom', 'glamorous', 'buble', 'codemirror']
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist')
    },
    resolve: {
      alias: {
        assets: path.join(__dirname, 'assets'),
        components: path.join(__dirname, 'src/components'),
        style: path.join(__dirname, 'src/style'),
        utils: path.join(__dirname, 'src/utils')
      },
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
          include: [path.join(__dirname, 'src')],
          exclude: [path.join(__dirname, 'src/Worker')]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [path.join(__dirname, 'node_modules')]
        },
        {
          test: /\.html$/,
          use: ['html-loader']
        },
        {
          test: /manifest\.json$/,
          use: ['file-loader']
        },
        {
          test: /\.js$/,
          use: ['raw-loader'],
          include: [path.join(__dirname, 'src/snippets')]
        },
        {
          test: /\.ts$/,
          use: ['worker-loader', 'awesome-typescript-loader'],
          include: path.join(__dirname, 'src/Worker')
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: 'src/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(environment)
      })
    ],
    externals: {
      React: 'react',
      ReactDOM: 'react-dom'
    },
    stats: {
      children: false
    }
  };

  return assign(base, require(`./webpack.config.${environment}`));
};
