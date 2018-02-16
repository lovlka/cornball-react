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
        test: /\.jsx?$/,
        include: /app/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        include: /app/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        include: /app/,
        use: extractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpe?g|svg|woff2?|ttf|otf|eot)$/,
        include: /app/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/'
        }
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