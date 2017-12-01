const path = require('path');

module.exports = {
  title: 'Codents Base Rect-Redux',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  env: {
    dev: 'dev',
    prod: 'prod',
  },
  api: {
    dev: 'http://localhost:3001',
    prod: 'https://static.codents.com/',
  },
  paths: {
    source: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../build'),
    root: path.resolve(__dirname, '../'),
  },
};
