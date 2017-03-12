import { gameStarted } from './statistics';

export const NEW_GAME = 'NEW_GAME';
export const NEW_ROUND = 'NEW_ROUND';
export const MOVE_CARD = 'MOVE_CARD';
export const UNDO_MOVE = 'UNDO_MOVE';

export function newGame() {
   return dispatch => {
      dispatch(gameStarted());
      dispatch({
         type: NEW_GAME
      });
   }
}

export function newRound() {
   return {
      type: NEW_ROUND
   };
}

export function moveCard(from, to) {
   return {
      type: MOVE_CARD,
      move: {from: from, to: to}
   };
}

export function undoMove() {
   return (dispatch, getState) => {
      const move = getState().undo.get('move');

      dispatch({
         type: UNDO_MOVE,
         move: move ? move.toJS() : null
      });
   }
}
