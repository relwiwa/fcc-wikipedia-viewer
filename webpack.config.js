// Webpack setup based on Stephen Grider's Udemy Webpack 2 course

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var packageJson = require('./package');

const VENDOR_LIBS = ['react', 'react-dom'];

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        }),
        test: /\.scss$/
      },
      {
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ],
        test: /\.(jpe?g|png|gif|svg)$/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};

module.exports = config;
