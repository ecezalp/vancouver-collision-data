var gulp = require('gulp');

// Build Path
var path = require('path');
const BUILD_PATH = path.join(__dirname, './dist');

// Globs
const GLOBS = {
  assets: ['src/main/resources/static/images/*'],
  js_jsx: ['src/main/javascript/**/*.+(js|jsx)'],
  scss: ['src/main/styles/**/*.+(scss|css)'],
  spec: ['src/test/javascript/**/*Spec.+(js|jsx)'],
  server: ['src/main/node/**/*.+(js|jsx)'],
};

// Webpack Configuration
var webpackStream = require('webpack-stream');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var _ = require('lodash');

const WBBPACK_SRC_CONFIG = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env', 'stage-2']
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: [/\.scss$/, /\.css$/],
        loader: ExtractTextPlugin.extract(
          {
            use: [{
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }],
            fallback: "style-loader"
          }
        )
      }, {
        test: /(icons|fonts)/,
        loader: 'url-loader'
      }, {
        test: [/\.png$/, /\.jpg$/, /\.svg$/],
        loader: 'url-loader?=mimetype=image/png'
      }
    ]
  }, resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css']
  }, plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],
};

const WEBPACK_BUILD_CONFIG = _.merge({}, WBBPACK_SRC_CONFIG, {
  entry: './src/main/javascript/index.jsx',
  output: {filename: 'bundle.js'}
});

const WEBPACK_STYLE_CONFIG = _.merge({}, WBBPACK_SRC_CONFIG, {
  entry: './src/main/styles/main.scss',
  output: {filename: 'bundle.css'}
});

const WEBPACK_TEST_CONFIG = _.merge({}, WBBPACK_SRC_CONFIG, {
  output: {filename: 'spec.js'},
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  node: {fs: 'empty'}
});

// Gulp tasks
var eslint = require('gulp-eslint');
var jasmineBrowser = require('gulp-jasmine-browser');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');

gulp.task('start', ['build'], function () {
  nodemon({
    script: './server.js'
  })
});

gulp.task('lint', function () {
  return gulp.src(GLOBS.js_jsx)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('headless', function () {
  return gulp.src(GLOBS.test)
    .pipe(webpackStream(WEBPACK_TEST_CONFIG))
    .pipe(jasmineBrowser.specRunner({console: true}))
});

gulp.task('test', function () {
  return gulp.src(GLOBS.spec)
    .pipe(webpackStream(_.merge({}, WEBPACK_TEST_CONFIG, {watch: true})))
    .pipe(jasmineBrowser.specRunner({}))
    .pipe(jasmineBrowser.server())
});

gulp.task('build', function () {
  return gulp.src(GLOBS.js_jsx)
    .pipe(webpackStream(WEBPACK_BUILD_CONFIG))
    .pipe(webpackStream(WEBPACK_STYLE_CONFIG))
    .pipe(gulp.dest(BUILD_PATH))
});

gulp.task('watch', ['watchStyle', 'watchCode']);

gulp.task('watchStyle', function () {
  return gulp.src(GLOBS.scss)
    .pipe(plumber(function () {
      console.error(arguments)
    }))
    .pipe(webpackStream(_.merge({}, WEBPACK_STYLE_CONFIG, {
      watch: true,
      devtool: 'inline-source-map',
    })))
    .pipe(gulp.dest(BUILD_PATH))
});

gulp.task('watchCode', function () {
  return gulp.src(GLOBS.js_jsx)
    .pipe(plumber(function () {
      console.error(arguments)
    }))
    .pipe(webpackStream(_.merge({}, WEBPACK_BUILD_CONFIG, {
      watch: true,
      devtool: 'inline-source-map',
    })))
    .pipe(gulp.dest(BUILD_PATH))
});