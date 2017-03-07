import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/main';

import configureStore from './configure-store';
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';
addLocaleData([...en, ...sv]);

import enMessages from './locales/en';
import svMessages from './locales/sv';
const messages = { en: enMessages(), sv: svMessages() };

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
