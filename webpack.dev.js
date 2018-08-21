const path = require('path');
const merge = require('webpack-merge');
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
  serve: {
    contentBase: path.resolve(__dirname, './assets'),
    port: 1234,
    open: true
  }
});
