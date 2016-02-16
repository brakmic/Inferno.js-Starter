/* jshint strict      : false */
//Plugins
var path              = require('path');
var gulp              = require('gulp');

var copy2             = require('gulp-copy2');
var shell             = require('gulp-shell');
var gutil             = require('gulp-util');
var uglify            = require('gulp-uglify');
var buffer            = require('vinyl-buffer');
var sourcemaps        = require('gulp-sourcemaps');
var rename            = require('gulp-rename');
var del               = require('del');
var stripDebug        = require('gulp-strip-debug');
var cache             = require('gulp-cached');
var changed           = require('gulp-changed');
var plumber           = require('gulp-plumber');
var concat            = require('gulp-concat');
var webpack           = require('webpack');
var webPackStream     = require('webpack-stream');
var webpackBuild      = require('gulp-webpack-build');
var WebpackDevServer  = require('webpack-dev-server');
var ts                = require('gulp-typescript');
var merge             = require('merge2');
var nodemon           = require('nodemon');
var webpackConfig     = require(__dirname + '/webpack.config');
var gulpIgnore        = require('gulp-ignore');
var livereload        = require('gulp-livereload');
var webpackInst       = webpack(webpackConfig);
//Paths
var root               = __dirname + '/';
var _sourcesRoot       = root + 'src/';
var _buildRoot         = root + 'build/';
var scriptsRoot        =  _sourcesRoot + 'scripts/';
var appScriptsRoot     = scriptsRoot + 'app/';
var tsRoot             = appScriptsRoot;
var vendorScriptsRoot  = scriptsRoot + 'vendor/';
var templatesRoot      = appScriptsRoot + 'templates/';
var stylesRoot         = _sourcesRoot + 'styles/';
var htmlRoot           = _sourcesRoot + '**/*.html';
var contentRoot        = _sourcesRoot + 'content/**';
var tsPattern          = tsRoot + '**/*.ts';
var jsPattern          = appScriptsRoot + '**/*.js*';
var cssPattern         = stylesRoot + '**/*.css';
var lessPattern        = stylesRoot + '**/*.less';
var sassPattern        = stylesRoot + '**/*.sass';
var htmlPattern        = scriptsRoot + '**/*.html';
var templatesPattern   = templatesRoot + '**/*.html';
var buildRoot          = _buildRoot + 'tmp/';
var releaseRoot        = './dist/';
var releaseScripts     = releaseRoot + 'scripts/';
var releaseStyles      = releaseRoot + 'styles/';
var defsDest           = buildRoot + 'defs/';
var scriptsDest        = buildRoot;
//******************************
var watchPaths        = [
                          tsPattern,
                          jsPattern,
                          cssPattern,
                          lessPattern,
                          sassPattern,
                          htmlPattern
                        ];

var webpackDest       = path.resolve(releaseRoot);

gulp.task('webpack',  ['copy'], function(){
  return gulp.src('build/tmp/scripts/app/main.jsx')
    .pipe(webPackStream(require('./webpack.config.js')))
    .pipe(gulp.dest(webpackDest));
});

gulp.task('webpack-dev-server', function(callback) {
  var server = new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    inline: true,
    noInfo: true,
    quiet: true,
    stats: { colors: true }
  });

  server.listen(8080, "localhost", function() {});

  gutil.log('[webpack-dev-server]',
    'http://localhost:8080/webpack-dev-server/build/release/index.html');

  callback();
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(watchPaths, ['copy']).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src('src/scripts/app/main.jsx')
              .pipe(webPackStream(require('./webpack.config.js')))
              .pipe(gulp.dest(webpackDest))
              .pipe(livereload());
        }
    });
});

gulp.task('clean', function (cb) {
    del([buildRoot + '**/*', buildRoot + '**/*'], function (err, deletedFiles) {
    if(err){
      console.log('Error during deletion: ' + err);
    }
  });
  cb();
});

gulp.task('compress', function() {
  return gulp.src('release/*.js')
    .pipe(uglify({
      mangle: false,
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
      }))
    .on('error', gutil.log)
    .pipe(gulp.dest('release'));
});

gulp.task('copyScripts', function(){
  return gulp.src([scriptsRoot + '**/*'],
                  {base: path.resolve(_sourcesRoot)})
          .pipe(changed(scriptsRoot + '**/*'))
          .pipe(gulp.dest(buildRoot));
});

gulp.task('copyStatics', function(){
  return gulp.src([htmlRoot, contentRoot],
                  {base: path.resolve(_sourcesRoot)})
          .pipe(gulp.dest(releaseRoot));
});

gulp.task('copyStyles', function(){
  return gulp.src([stylesRoot + '**/*.*'],
              {base: path.resolve(_sourcesRoot)})
          .pipe(changed(stylesRoot + '**/*.*'))
          .pipe(gulp.dest(releaseRoot));
});

gulp.task('run', ['watch'], function() {
  nodemon({
    execMap: {
      js: 'babel-node'
    },
    script: 'index.js',
    ext: 'noop'
  }).on('restart', function() {
    console.log('restarted!');
  });
});

gulp.task('dev', [
  'webpack-dev-server',
  'webpack'
]);

gulp.task('default',['webpack']);
gulp.task('copy', ['copyScripts', 'copyStatics', 'copyStyles'])