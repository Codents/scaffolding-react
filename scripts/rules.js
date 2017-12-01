const autoprefixer = require('autoprefixer');
const defaults = require('./defaults');

function commonRules() {
  return [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.(png|gif|jpg|svg)$/,
      use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
    },
    {
      test: /.*\.(woff|woff2|eot|ttf)$/i,
      use: 'file-loader?hash=sha512&digest=hex&name=./assets/[hash].[ext]',
    },
    {
      test: /.*\.(webm|mp4|ogv)$/i,
      use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
    },
  ];
}

function prodRules() {
  return [
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => {
              return [autoprefixer];
            },
          },
        },
        'sass-loader',
      ],
    },
  ];
}

function devRules() {
  return [
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => {
              return [autoprefixer];
            },
          },
        },
        'sass-loader?sourceMap',
      ],
    },
  ];
}

function rules(env) {
  return env === defaults.env.dev
    ? commonRules(env).concat(devRules(env))
    : commonRules(env).concat(prodRules(env));
}

module.exports = rules;
