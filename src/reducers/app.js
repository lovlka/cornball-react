import Immutable from 'immutable';

import { HIGH_SCORE } from '../actions/highscore';
import { STATISTICS } from '../actions/statistics';

const initialState = {
  highScore: null,
  highScores: [],
  allTimeHigh: [],
  statistics: []
};

export function app(state = Immutable.Map(initialState), action = null) {
  switch (action.type) {
    case HIGH_SCORE:
      return state.merge(action.state);

    case STATISTICS:
      // TODO: Remove gamesStarted, calculate gamesPlayed and percent
      return state.merge(action.state);

    default:
      return state;
  }
}
