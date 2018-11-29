const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env = {}) => {
  // Variables set by npm scripts in package.json
  const isProduction = env.production === true
  console.log(env.production);

    var HOST = 'http://localhost'
    var PORT = 8080
    var ENV = 'prod'

    if (!isProduction) {
      HOST = 'jarisk.com'
      PORT = 80;
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
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
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
    //devtool: '#eval-source-map' //this bloats it
  }
}