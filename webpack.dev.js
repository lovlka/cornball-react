const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: /src/,
      loader: 'babel-loader',
      options: {
        plugins: ['react-refresh/babel']
      }
    }, {
      test: /\.s?css$/,
      include: /src/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ],
  devServer: {
    port: 1234,
    open: true,
    hot: true
  }
});
