const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const defaults = require('./defaults');

function commonPlugins(env) {
  return [
    new CleanWebpackPlugin([path.join(defaults.paths.build, '*.*')], {
      root: defaults.paths.root,
      verbose: true,
      dry: false,
    }),
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
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(env.version),
      API: defaults.env[env],
    }),
  ];
}

function devPlugins() {
  return [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()];
}

function prodPlugins() {
  return [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
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
    new ExtractTextPlugin('style-[hash].css'),
  ];
}

function plugins(env) {
  return env === defaults.env.dev
    ? commonPlugins(env).concat(devPlugins(env))
    : commonPlugins(env).concat(prodPlugins(env));
}

module.exports = plugins;
