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
    return highScore ? highScore.toObject() : null;
  }
);

export const canUndo = createSelector(
  state => state.undo,
  undo => undo.get('move') !== null
);
