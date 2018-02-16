const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractTextPlugin = new ExtractTextPlugin('cornball.[chunkhash].css');

const config = {
  entry: './app/cornball.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cornball.[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /app/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        include: /app/,
        exclude: /node_modules/,
        use: ['html-loader']
      },
      {
        test: /\.s?css$/,
        use: extractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ template: './app/assets/index.html' }),
    extractTextPlugin
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist/assets'),
    compress: true,
    port: 12000,
    stats: 'errors-only',
    open: true
  },
  devtool: 'inline-source-map'
};

module.exports = config;