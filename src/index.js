import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import './styles/index.scss';
import './assets/favicon.ico';
import './assets/favicon.png';
import './assets/apple-touch-icon.png';
import './assets/share.png';
import './assets/app.webmanifest';

import Main from './components/main';
import svMessages from './locales/sv';
import configureStore from './configure-store';

const messages = {
  sv: svMessages()
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cornball');
  const root = createRoot(container);
  root.render(
    <Provider store={configureStore()}>
      <IntlProvider locale={navigator.language} messages={messages[navigator.language]}>
        <Main />
      </IntlProvider>
    </Provider>
  );
  document.body.removeAttribute('style');
});
