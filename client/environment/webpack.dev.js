/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.config');

const dotenvPath = path.resolve(__dirname, '.env.development');

module.exports = merge(common, {
  output: {
    filename: '[name].bundle.js',
  },
  plugins: [
    ...common.plugins,
    new Dotenv({ path: dotenvPath }),
  ],
});
