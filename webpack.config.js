const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const clientDIR = path.join(__dirname, 'client', 'App.jsx');
const publicDIR = path.join(__dirname, 'public');

module.exports = {
  entry: `${clientDIR}`,
  output: {
    filename: 'bundle.js',
    path: publicDIR,
  },
  resolve: {
    mainFiles: ['index'],
    extensions: ['.js', '.jsx', /\.s?css/],
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/, /\.js$/],
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
    ],
  },
  optimization: {
    nodeEnv: 'production',
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new CompressionPlugin(),
    new Dotenv(),
  ],
};
