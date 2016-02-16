'use strict';
var webpack           = require('webpack');
var AsyncUglifyJs     = require("async-uglify-js-webpack-plugin");
var path              = require('path');
var CompressionPlugin = require('compression-webpack-plugin');
var root              = __dirname + '/';
var srcRoot           = root + 'src/';
var npmRoot           = root + 'node_modules/';
var stylesRoot        = srcRoot + 'styles/';
var nodeScripts       = root + 'node_modules/';
var scripts           = srcRoot + 'scripts/';
var buildScripts      = root + 'src/scripts/';
var releaseScripts    = 'build/release/';
var vendorScripts     = buildScripts + 'vendor/';
var vendorStyles      = stylesRoot + 'vendor/';
var appScripts        = buildScripts + 'app/';
var componentScripts  = buildScripts + 'app/components/';
var modelScripts      = buildScripts + 'app/models/';
var serviceScripts    = buildScripts + 'app/services/';

var config = {
  cache: false,
  entry: [
      './src/scripts/app/main.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map',
    publicPath: '/static/'
  },

  module: {
    /*preLoaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /vendor/],
                loader: "jshint-loader"
            }
        ],
        jshint: {
          esnext: true,
          failOnHint: false
        },*/
    loaders: [
            {
                include: /\.json$/,
                loaders: ["json-loader"]
            },
            {
                test : /\.ts$/,
                exclude: [/^(node_modules|bower_components|vendor)/],
                loader: 'typescript-loader?typescriptCompiler=typescript'
            },
            {
                test : /\.(es6|js|jsx)$/,
                exclude: [/^(node_modules|bower_components|vendor)/],
                loader: 'babel-loader',
                query: {
                  presets: ['stage-0', 'stage-1', 'stage-2', 'es2015']
                }
            },
            {
                test : /\.html$/,
                loader: 'html'
            },
            {
                test : /\.scss$/,
                loader: 'style-loader!css-loader!scss-loader'
            },
            {
                test : /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test : /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {   test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=8192'
            },
            {   test: /\.jpg$/,
                loader: "file-loader?name=[path][name].[ext]"
            },
    ]
  },
   resolve: {
      root: root,
      extensions: ['', '.js', '.es6', '.es6.js', '.jsx', '.json', '.ts', '.css', '.html'],
      modulesDirectories: ['node_modules', 'bower_components', 'vendorStyles', 'vendorScripts'],
      alias: {
              "bootstrap.css"       : "static/styles/bootstrap/css/bootstrap.min.css",
              "bootstrap-theme.css" : "static/styles/bootstrap/css/bootstrap-theme.min.css",
              "bootstrap.js"        : "src/scripts/vendor/bootstrap/js/bootstrap.min.js"
      }
  },
  plugins: [
/*        new CompressionPlugin({
            asset     : '{file}.gz',
            algorithm : 'gzip',
            regExp    : /\.js$|\.html$/,
            threshold : 10240,
            minRatio  : 0.8
        }),*/
        //
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "windows.jQuery": "jquery",
          'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};
if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new AsyncUglifyJs({
      delay: 5000,
      minifyOptions: {
        mangle: false,
        warnings: true,
        compress: {
          sequences     : true,  // join consecutive statemets with the “comma operator”
          properties    : true,  // optimize property access: a["foo"] → a.foo
          dead_code     : true,  // discard unreachable code
          drop_debugger : true,  // discard “debugger” statements
          unsafe        : false, // some unsafe optimizations (see below)
          conditionals  : true,  // optimize if-s and conditional expressions
          comparisons   : true,  // optimize comparisons
          evaluate      : true,  // evaluate constant expressions
          booleans      : true,  // optimize boolean expressions
          loops         : true,  // optimize loops
          unused        : true,  // drop unused variables/functions
          hoist_funs    : true,  // hoist function declarations
          hoist_vars    : false, // hoist variable declarations
          if_return     : true,  // optimize if-s followed by return/continue
          join_vars     : true,  // join var declarations
          cascade       : true,  // try to cascade `right` into `left` in sequences
          side_effects  : true,  // drop side-effect-free statements
          warnings      : true,  // warn about potentially dangerous optimizations/code
        }
      },
      logger: false,
      done: function(path, originalContents) { }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]);
} else {
    config.devtool = '#source-map';
    config.debug   = true;
}

config.useMemoryFs = true;
config.progress = true;

module.exports = config;
