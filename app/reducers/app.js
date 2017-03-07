import Immutable from 'immutable';

import { NETWORK } from '../actions/network';
import { HIGH_SCORE } from '../actions/highscore';
import { STATISTICS } from '../actions/statistics';

const initialState = {
   networkFailed: false,
   networkProgress: false,
   highScore: null,
   statistics: []
};

export function app(state = Immutable.Map(initialState), action = null) {
   switch (action.type) {
      case NETWORK:
      case HIGH_SCORE:
      case STATISTICS:
         return state.merge(action.state);

      default:
         return state;
   }
}