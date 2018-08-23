import Immutable from 'immutable';

import { TOGGLE_HIGH_SCORE, TOGGLE_STATISTICS, TOGGLE_ABOUT } from '../actions/app';
import { HIGH_SCORE } from '../actions/highscore';
import { STATISTICS } from '../actions/statistics';

const initialState = {
  showHighScore: false,
  showStatistics: false,
  showAbout: false,
  highScore: null,
  highScores: [],
  allTimeHigh: [],
  statistics: []
};

export function app(state = Immutable.Map(initialState), action = null) {
  switch (action.type) {
    case TOGGLE_HIGH_SCORE:
      return state.merge({ showHighScore: action.show });

    case TOGGLE_STATISTICS:
      return state.merge({ showStatistics: action.show });

    case TOGGLE_ABOUT:
      return state.merge({ showAbout: action.show });

    case HIGH_SCORE:
      return state.merge(action.state);

    case STATISTICS:
      // TODO: Remove gamesStarted, calculate gamesPlayed and percent
      return state.merge(action.state);

    default:
      return state;
  }
}
