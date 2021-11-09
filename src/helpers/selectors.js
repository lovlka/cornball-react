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
  highScore => highScore
);

export const getHighScores = createSelector(
  state => state.app.get('highScores'),
  highScores => highScores
);

export const getAllTimeHigh = createSelector(
  state => state.app.get('allTimeHigh'),
  allTimeHigh => allTimeHigh
);

export const getStatistics = createSelector(
  state => state.app.get('statistics'),
  statistics => statistics
);

export const canUndo = createSelector(
  state => state.undo,
  undo => undo.get('move') !== null
);
