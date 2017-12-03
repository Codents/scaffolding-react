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
    dev: {
      base: 'http://localhost:3001',
      weather: 'https://api.openweathermap.org/data/2.5',
    },
    prod: {
      base: 'https://static.codents.com/',
      weather: 'https://api.openweathermap.org/data/2.5',
    },
  },
  paths: {
    source: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../build'),
    root: path.resolve(__dirname, '../'),
  },
  tokens: {
    weather: '41a4d1fdedb1fbf48d046309712846bb',
  },
};
