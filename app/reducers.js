import { combineReducers } from 'redux';
import Immutable from 'immutable';

import { NETWORK } from './actions';

function appState(state = Immutable.Map({
   networkFailed: false,
   networkProgress: false
}), action = null) {
   switch (action.type) {
      case NETWORK:
         return state.merge(action.state);

      default:
         return state;
   }
}

const rootReducer = combineReducers({
   appState
});

export default rootReducer;