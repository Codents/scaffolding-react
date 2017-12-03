const plugins = require('./plugins');
const rules = require('./rules');
const config = require('./config');

const defaults = require('./defaults');

module.exports = function (env) {
  return {
    devtool: config.devTool(env.env),
    context: defaults.paths.source,
    entry: config.entries(env.env),
    output: config.output(),
    module: {
      rules: rules(env.env),
    },
    resolve: {
      extensions: config.extensions(),
      modules: config.modules(),
    },
    plugins: plugins(env),
    devServer: config.devServer(env.env),
  };
};
