import Immutable from 'immutable';

import { NETWORK } from '../actions/network';
import { HIGH_SCORE } from '../actions/highscore';
import { STATISTICS } from '../actions/statistics';

const initialState = {
   networkFailed: false,
   networkProgress: false,
   highScore: null,
   highScores: [],
   allTimeHigh: [],
   statistics: []
};

export function app(state = Immutable.Map(initialState), action = null) {
   switch (action.type) {
      case NETWORK:
      case HIGH_SCORE:
         return state.merge(action.state);

      case STATISTICS:
         // TODO: Remove gamesStarted, calculate gamesPlayed and percent
         return state.merge(action.state);

      default:
         return state;
   }
}