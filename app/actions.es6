import { postJson } from './utils/network';

export const NETWORK = 'NETWORK';
export const NEW_GAME = 'NEW_GAME';
export const NEW_ROUND = 'NEW_ROUND';
export const MOVE_CARD = 'MOVE_CARD';
export const UNDO_MOVE = 'UNDO_MOVE';

export function newGame() {
   return {
      type: NEW_GAME
   };
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
   return {
      type: UNDO_MOVE
   };
}

export function networkProgress() {
   return {
      type: NETWORK,
      state: {
         networkProgress: true,
         networkFailed: false
      }
   };
}

export function networkFailed(error) {
   return {
      type: NETWORK,
      state: {
         networkProgress: false,
         networkFailed: true
      }
   };
}

export function resetNetwork() {
   return {
      type: NETWORK,
      state: {
         networkProgress: false,
         networkFailed: false
      }
   };
}

export function dummyMethod(data) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/dummy', data)
          .then(response => dispatch(resetNetwork()))
          .catch(error => dispatch(networkFailed(error)));
   }
}