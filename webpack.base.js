const path = require('path');
const Dotenv = require('dotenv-webpack');
const { ProgressPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cornball.[fullhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(ico|png|svg|woff2?|ttf|otf|eot|webmanifest)$/,
      exclude: /node_modules/,
      loader: 'file-loader',
      options: {
        context: './src/assets/',
        name: '[name].[ext]',
        useRelativePath: true
      }
    }]
  },
  performance: {
    hints: false
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/assets/index.html',
      minify: {
        collapseWhitespace: true,
        minifyJS: true
      }
    })
  ]
};

module.exports = config;
