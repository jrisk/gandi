var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
//old or new
var baseWebpackConfig = require('./webpack.config.old')
var baseNewConfig = require('./webpack.config.new');

var webpackConfig = merge(baseNewConfig(process.env), {
  target: 'node',
  entry: {
    app: './src/server-entry.js'
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: Object.keys(require('./package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production'
    })
  ]
})
module.exports = webpackConfig