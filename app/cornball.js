import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureStore from './configure-store';

import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';
addLocaleData([...en, ...sv]);

import Main from './components/main'
import HighScore from './components/highscore'
import Statistics from './components/statistics'
import About from './components/about'

document.addEventListener('DOMContentLoaded', () => {
   ReactDOM.render(
      <Provider store={configureStore()}>
         <IntlProvider locale={navigator.language}>
            <Router history={browserHistory}>
               <Route path="/" component={Main}>
                  <Route path="highscore" component={HighScore} />
                  <Route path="statistics" component={Statistics} />
                  <Route path="about" component={About} />
                  <Route path="*" />
               </Route>
            </Router>
         </IntlProvider>
      </Provider>,
      document.getElementById('cornball')
   );
});
