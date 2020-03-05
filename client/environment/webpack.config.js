/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');

const clientDIR = path.resolve(__dirname, '..');
const pathFromClientDIR = (...paths) => path.resolve(clientDIR, ...paths);

const appDIR = path.resolve(__dirname, '..', 'App.tsx');
const publicDIR = path.resolve(__dirname, '..', '..', 'public');
const templateDIR = path.resolve(__dirname, '..', '..', 'public', 'index.html');
const template = path.resolve(__dirname, '..', '..', 'public', 'index.template.html');
const dotenvPath = path.resolve(__dirname, '.env.production');

module.exports = {
  entry: appDIR,
  output: {
    filename: '[name].[contenthash].js',
    path: publicDIR,
    publicPath: '/',
  },
  // Enable sourcemaps for debugging webpack's output.
  // devtool: 'source-map',
  devtool: false,
  stats: {
    children: false,
    entrypoints: false,
    modules: false,
  },
  resolve: {
    alias: {
      store: pathFromClientDIR('store'),
      pages: pathFromClientDIR('pages'),
      components: pathFromClientDIR('components'),
      utils: pathFromClientDIR('utils'),
      models: pathFromClientDIR('models'),
      services: pathFromClientDIR('services'),
    },
    mainFiles: ['index'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/, /\.tsx$/, /\.ts$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              camelCase: 'dashes',
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  optimization: {
    nodeEnv: 'production',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          maxInitialRequests: 10,
        },
      },
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    // new CompressionPlugin(),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template,
      filename: templateDIR,
    }),
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new Dotenv({ path: dotenvPath }),
  ],
};
