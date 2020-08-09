import { fromJS } from 'immutable';

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

export function app(state = fromJS(initialState), action = null) {
  switch (action.type) {
    case TOGGLE_HIGH_SCORE:
      return state.merge({ showHighScore: action.show });

    case TOGGLE_STATISTICS:
      return state.merge({ showStatistics: action.show });

    case TOGGLE_ABOUT:
      return state.merge({ showAbout: action.show });

    case HIGH_SCORE:
      return state.merge(action.state);

    case STATISTICS: {
      let gamesPlayed = 0;
      const data = action.state.statistics;
      data.splice(data.findIndex(s => s.name === 'gamesStarted'), 1);
      data.forEach((s) => { gamesPlayed += s.value; });

      const statistics = [{ name: 'gamesPlayed', value: gamesPlayed }]
        .concat(data.map(s => ({ ...s, percent: s.value / gamesPlayed })));

      return state.merge({ statistics });
    }

    default:
      return state;
  }
}
