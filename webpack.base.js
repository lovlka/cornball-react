const path = require('path');
const { ProgressPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cornball.[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: /src/,
      loader: 'babel-loader'
    }, {
      test: /\.html$/,
      include: /src/,
      loader: 'html-loader',
      options: {
        minimize: true
      }
    }, {
      test: /\.(png|jpe?g|svg|woff2?|ttf|otf|eot)$/,
      exclude: /node_modules/,
      loader: 'file-loader',
      options: {
        context: './src/',
        name: '[name].[ext]',
        useRelativePath: true
      }
    }]
  },
  performance: {
    hints: false
  },
  plugins: [
    new ProgressPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/assets/index.html'
    })
  ]
};

module.exports = config;
