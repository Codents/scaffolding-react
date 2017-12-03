import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { IntlProvider } from 'react-intl';
import thunk from 'redux-thunk';
import { router, reducers } from './modules/main';
import logger from './middleware/logger';
import { language, messages } from './assets/locales';

console.log(
  'ENV VARS %o %s %o %s',
  process.env.API,
  process.env.VERSION,
  process.env.TOKENS,
  process.env.ENV
);
const store = createStore(reducers, applyMiddleware(thunk, logger));

const render = Component => {
  ReactDOM.render(
    <Provider store={ store }>
      <IntlProvider locale={ language } messages={ messages }>
        <Component />
      </IntlProvider>
    </Provider>,
    document.getElementById('app-container')
  );
};

render(router);
