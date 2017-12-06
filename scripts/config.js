const defaults = require('./defaults');

function prodEntries() {
  return ['babel-polyfill', 'app.js'];
}

function devEntries() {
  return [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'app.js',
  ];
}

function entries(env) {
  return env === defaults.env.prod ? prodEntries() : devEntries();
}

function devServer(env) {
  return {
    contentBase: env === defaults.env.prod ? '../build' : '../app',
    historyApiFallback: true,
    port: defaults.devServer.port,
    compress: env === defaults.env.prod,
    inline: env === defaults.env.dev,
    host: defaults.devServer.host,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  };
}

function extensions() {
  return ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'];
}

function modules() {
  return ['node_modules', defaults.paths.source];
}

function output() {
  return {
    path: defaults.paths.build,
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  };
}

function devTool(env) {
  return env === defaults.env.prod ? 'cheap-module-source-map' : 'source-map';
}

module.exports = {
  entries,
  devServer,
  extensions,
  modules,
  output,
  devTool,
};
