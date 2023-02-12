import { createSelector } from 'reselect';

export const getGameState = createSelector(
  state => state.game,
  game => ({
    round: game.get('round'),
    rounds: game.get('rounds'),
    score: game.get('score'),
    moves: game.get('moves'),
    locked: game.get('locked'),
    placed: game.get('placed')
  })
);

export const getHighScore = createSelector(
  state => state.app.get('highScore'),
  highScore => (highScore ? highScore.toJS() : null)
);

export const getHighScores = createSelector(
  state => state.app.get('highScores'),
  highScores => (highScores ? highScores.toJS() : null)
);

export const getAllTimeHigh = createSelector(
  state => state.app.get('allTimeHigh'),
  allTimeHigh => (allTimeHigh ? allTimeHigh.toJS() : null)
);

export const getStatistics = createSelector(
  state => state.app.get('statistics'),
  statistics => (statistics ? statistics.toJS() : null)
);

export const canUndo = createSelector(
  state => state.undo,
  undo => undo.get('move') !== null
);
