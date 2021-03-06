var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: {
    'vendor': './src/app/vendor.ts',
    'polyfills': './src/app/polyfills.ts',
    'app': './src/app/main.ts',
  },

  output: {
    path: __dirname + '/app/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: path.resolve('src/node_modules'),
    extensions: ['','.ts','.js','.css','.scss']
  },

  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts',
      },
      {
        test: /\.scss$/,
        loaders: ["raw-loader", "sass"]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.proto$/,
        loader: 'raw-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.proto$/,
        loader: "proto-loader"
      }
    ]
  },

  plugins: [
    new CommonsChunkPlugin({ name: ['vendor', 'polyfills']}),
    new webpack.IgnorePlugin(/vertx/),
    
    new CopyWebpackPlugin([
      {from: 'src/node_modules/lato-font/fonts/lato-normal/lato-normal.ttf', to: 'fonts'},
      {from: 'src/node_modules/node-pogo-protos/proto', to: 'proto'},
      {from: 'src/node_modules/node-pogo-signature/lib//proto', to: 'proto'}
    ])
  ],

  target:'electron-renderer',

  node: {
    __dirname: false,
    __filename: false
  },
};
