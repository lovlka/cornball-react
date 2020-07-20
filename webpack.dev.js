const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.s?css$/,
      include: /src/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new Dotenv()
  ],
  devServer: {
    port: 1234,
    open: true
  }
});
