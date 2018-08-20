const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'cornball.[hash].css'
    }),
    new OptimizeCssAssetsPlugin()
  ]
});
