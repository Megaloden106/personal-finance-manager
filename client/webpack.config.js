/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');

const rootDIR = path.resolve(__dirname, '..');
const clientDIR = path.resolve(__dirname);

const appDIR = path.resolve(__dirname, 'App.tsx');
const publicDIR = path.resolve(__dirname, '..', 'public');

const template = path.resolve(__dirname, '..', 'public', 'index.template.html');

module.exports = {
  entry: appDIR,
  output: {
    // filename: '[name].[contenthash].js',
    filename: '[name].bundle.js',
    path: publicDIR,
  },
  // Enable sourcemaps for debugging webpack's output.
  // devtool: 'source-map',
  devtool: false,
  resolve: {
    alias: {
      '~': rootDIR,
      '@': clientDIR,
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
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  optimization: {
    nodeEnv: 'production',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          // name(module, chunks, cacheGroupKey) {
          //   const moduleFileName = module.identifier();
          //   if (moduleFileName.match(/react|redux/g)) {
          //     return 'react';
          //   }
          //   if (moduleFileName.match(/d3/g)) {
          //     return 'd3';
          //   }
          //   return cacheGroupKey;
          // },
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
    new HtmlWebpackPlugin({ template }),
    new Dotenv(),
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
