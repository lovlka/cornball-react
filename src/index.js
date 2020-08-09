import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import './styles/index.scss';
import './assets/favicon.ico';
import './assets/favicon.png';
import './assets/apple-touch-icon.png';

import Main from './components/main';
import svMessages from './locales/sv';
import configureStore from './configure-store';

const messages = {
  sv: svMessages()
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <IntlProvider locale={navigator.language} messages={messages[navigator.language]}>
        <Main />
      </IntlProvider>
    </Provider>,
    document.getElementById('cornball')
  );
  document.body.removeAttribute('style');
});
