const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = function(env) {
  // Variables set by npm scripts in package.json
  const isProduction = env.production === true

  var HOST = 'http://jarisk.com'
  var PORT = 80;
  var ENV = 'prod'

  console.log(isProduction);

  if (!isProduction) {
    HOST = 'http://localhost'
    PORT = 8080
    ENV = 'local'
  }

  return {
    entry: './src/client-entry.js',
    mode: 'production',
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: '/dist/',
      filename: 'build.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'vue-style-loader' },
            { loader: 'css-loader' }
          ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
              // the "scss" and "sass" values
              'scss': [
                'vue-style-loader',
                'css-loader'//,
              ],
              'sass': [
                'vue-style-loader',
                'css-loader'//,
              ]
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(ENV),
          NODE_HOST: JSON.stringify(HOST),
          NODE_PORT: JSON.stringify(PORT)
        }
      }),
      new VueLoaderPlugin()
    ],
    /*
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: 'source-map' //eval-this bloats it
    */
  }
}

/*

module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        NODE_HOST: '"http://localhost"',
        NODE_PORT: 8080
      }
    }),
    new VueLoaderPlugin()
  ])

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
}
*/