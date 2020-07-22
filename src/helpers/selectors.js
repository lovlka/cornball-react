import { createSelector } from 'reselect';

export const getGameState = createSelector(
  state => state.game,
  game => ({
    round: game.get('round'),
    rounds: game.get('rounds'),
    score: game.get('score'),
    moves: game.get('moves')
  })
);

export const getHighScore = createSelector(
  state => state.app,
  (app) => {
    const highScore = app.get('highScore');
    return highScore ? highScore.toJS() : null;
  }
);

export const getHighScores = createSelector(
  state => state.app,
  app => app.get('highScores').toJS()
);

export const getAllTimeHigh = createSelector(
  state => state.app,
  app => app.get('allTimeHigh').toJS()
);

export const getStatistics = createSelector(
  state => state.app,
  app => app.get('statistics').toJS()
);

export const canUndo = createSelector(
  state => state.undo,
  undo => undo.get('move') !== null
);
