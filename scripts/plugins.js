const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const defaults = require('./defaults');

function commonPlugins(env) {
  return [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].js',
      minChunks(module) {
        const { context } = module;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(defaults.paths.source, 'index.html'),
      path: defaults.paths.build,
      filename: 'index.html',
      title: defaults.title,
      // faviicon
    }),
    new webpack.EnvironmentPlugin({
      VERSION: env.version,
      API: defaults.api,
      TOKENS: defaults.tokens,
      ENV: env.env,
    }),
  ];
}

function devPlugins() {
  return [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    /* new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }), */
  ];
}

function prodPlugins(env) {
  return [
    new CleanWebpackPlugin([path.join(defaults.paths.build, '*.*')], {
      root: defaults.paths.root,
      verbose: true,
      dry: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.EnvironmentPlugin({
      VERSION: env.version,
      API: defaults.api,
      TOKENS: defaults.tokens,
      ENV: env.env,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') >= 0;
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 3 version', 'ie >= 10'],
          }),
        ],
        context: defaults.paths.build,
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(defaults.paths.source, 'index.html'),
      path: defaults.paths.build,
      excludeChunks: ['base'],
      filename: 'index.html',
      title: defaults.title,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: 'all',
      fileBlacklist: [/\.(css|map)$/, /base?.+/],
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),
    new StyleExtHtmlWebpackPlugin({
      minify: true,
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true,
    }),
  ];
}

function plugins(env) {
  return env.env === defaults.env.dev ? commonPlugins(env).concat(devPlugins()) : prodPlugins(env);
}

module.exports = plugins;
