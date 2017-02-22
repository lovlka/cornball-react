import { combineReducers } from 'redux';
import Immutable from 'immutable';

import { NETWORK } from './actions';

function appState(state = Immutable.Map({
   networkFailed: false,
   networkProgress: false,
   highScoreName: 'Victor',
   highScore: 6341
}), action = null) {
   switch (action.type) {
      case NETWORK:
         return state.merge(action.state);
      default:
         return state;
   }
}

function gameState(state = Immutable.Map({
   round: 1,
   rounds: 5,
   score: 0,
   moves: 0
}), action = null) {
   switch (action.type) {
      default:
         return state;
   }
}

const rootReducer = combineReducers({
   appState,
   gameState
});

export default rootReducer;