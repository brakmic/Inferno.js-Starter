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
var releaseScripts    = root + 'build/release/';
var vendorScripts     = buildScripts + 'vendor/';
var vendorStyles      = stylesRoot + 'vendor/';
var appScripts        = buildScripts + 'app/';
var componentScripts  = buildScripts + 'app/components/';
var modelScripts      = buildScripts + 'app/models/';
var serviceScripts    = buildScripts + 'app/services/';

var config = {
  cache: false,
  entry: {
    'app': path.resolve(appScripts, 'main.js')
  },
  output: {
    path: path.resolve(releaseScripts),
    filename: '[name].min.js',
    sourceMapFilename: '[name].min.js.map',
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
    devServer: {
      contentBase: './output/release/',
      port: 8080,
      noInfo: false,
      hot: true,
      inline: true,
      proxy: {
        '/': {
          bypass: function (req, res, proxyOptions) {
            return '/index.html';
          }
        }
      }
    },
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
                test : /\.(es6|js)$/,
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
                test : /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test : /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {   test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loader: 'url-loader?limit=100000'
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
              "bootstrap.css"       : "src/styles/bootstrap/css/bootstrap.min.css",
              "bootstrap-theme.css" : "src/styles/bootstrap/css/bootstrap-theme.min.css",
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
         new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
         new webpack.ProvidePlugin({
          'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "windows.jQuery": "jquery"
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
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
    })
  ]);
} else {
    config.devtool = '#source-map';
    config.debug   = true;
}

config.useMemoryFs = true;
config.progress = true;

module.exports = config;
