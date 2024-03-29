const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: /src/,
      loader: 'babel-loader'
    }, {
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
      extractComments: false,
      terserOptions: {
        output: {
          comments: false
        }
      }
    })]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'cornball.[fullhash].css'
    }),
    new CssMinimizerPlugin()
  ]
});
