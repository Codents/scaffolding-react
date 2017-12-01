import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { IntlProvider } from 'react-intl';
import thunk from 'redux-thunk';
import { router } from './modules/main';
import logger from './middleware/logger';
import { en, es } from './assets/locales';

console.log('ENV VARS %s %s', API, VERSION);
const store = createStore(applyMiddleware(thunk, logger));

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <IntlProvider locale={navigator.language} messages={navigator.language === 'en' ? en : es}>
          <Component />
        </IntlProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app-container')
  );
};

render(router);

if (module.hot) {
  console.log('Hot loader actived');
  module.hot.accept('./modules/main/router', () => {
    render(router);
  });
}
