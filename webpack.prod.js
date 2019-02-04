const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
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
  optimization: {
    minimizer: [new TerserPlugin({
      parallel: true,
      sourceMap: true,
      terserOptions: {
        output: {
          comments: false
        }
      }
    })]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'cornball.[hash].css'
    }),
    new OptimizeCssAssetsPlugin()
  ]
});
