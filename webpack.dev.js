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
  devServer: {
    port: 1234,
    open: true
  }
});
