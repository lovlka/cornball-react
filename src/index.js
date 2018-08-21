import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

import './styles/index.scss';
import Main from './components/main';
import svMessages from './locales/sv';
import configureStore from './configure-store';

addLocaleData([...en, ...sv]);
const messages = { sv: svMessages() };

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <IntlProvider locale={navigator.language} messages={messages[navigator.language]}>
        <Router>
          <Route path="/" component={Main} />
        </Router>
      </IntlProvider>
    </Provider>,
    document.getElementById('cornball')
  );
});
