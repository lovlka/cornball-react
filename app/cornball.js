import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import configureStore from './configure-store';

import Root from './components/root'
import HighScore from './components/about'
import Statistics from './components/about'
import About from './components/about'

document.addEventListener('DOMContentLoaded', () => {
   ReactDOM.render(
      <Provider store={configureStore()}>
         <Router history={browserHistory}>
            <Route path="/" component={Root}>
               <Route path="highscore" component={HighScore} />
               <Route path="statistics" component={Statistics} />
               <Route path="about" component={About} />
            </Route>
         </Router>
      </Provider>,
      document.getElementById('cornball')
   );
});
