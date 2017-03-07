import Immutable from 'immutable';

import { NETWORK } from '../actions/network';
import { HIGH_SCORE } from '../actions/highscore';

const initialState = {
   networkFailed: false,
   networkProgress: false,
   highScore: null
};

export function app(state = Immutable.Map(initialState), action = null) {
   switch (action.type) {
      case NETWORK:
      case HIGH_SCORE:
         return state.merge(action.state);

      default:
         return state;
   }
}