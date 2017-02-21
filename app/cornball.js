import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root'
import { Provider } from 'react-redux';
import configureStore from './configure-store';

document.addEventListener('DOMContentLoaded', () => {
   ReactDOM.render(
      <Provider store={configureStore()}>
         <Root />
      </Provider>,
      document.getElementById('cornball')
   );
});
