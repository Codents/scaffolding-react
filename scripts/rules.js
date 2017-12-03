const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      test: /\.(js|jsx)$/,
      exclude: ['/node_modules/', '/assets'],
      use: ['babel-loader'],
      include: defaults.paths.source,
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{ loader: 'css-loader?importLoaders=1', options: { minimize: true } }],
      }),
    },
    {
      test: /\.(sass|scss)$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { minimize: true } },
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
      }),
    },
    {
      test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
      use: 'file-loader?name=assets/[name]-[hash].[ext]',
    },
    {
      test: /.*\.(webm|mp4|ogv)$/i,
      use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
    },
    {
      test: /\.(png|gif|jpg|svg)$/,
      use: ['url-loader?limit=20480&name=assets/[name]-[hash].[ext]'],
      include: defaults.paths.build,
    },
  ];
}

function devRules() {
  return [
    {
      test: /\.css$/,
      use: ['style-loader?sourceMap', 'css-loader?sourceMap'],
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        'style-loader?sourceMap',
        'css-loader?sourceMap',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
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
  return env === defaults.env.dev ? commonRules(env).concat(devRules()) : prodRules(env);
}

module.exports = rules;
