import { gameStarted } from './statistics';

export const NEW_GAME = 'NEW_GAME';
export const NEW_ROUND = 'NEW_ROUND';
export const MOVE_CARD = 'MOVE_CARD';
export const UNDO_MOVE = 'UNDO_MOVE';
export const SET_SCORE = 'SET_SCORE';
export const SET_ROUND_PLACED = 'SET_ROUND_PLACED';

export function newGame() {
   return dispatch => {
      dispatch({
         type: NEW_GAME
      });
      dispatch(gameStarted());
      dispatch(checkAllCards());
   }
}

export function newRound() {
   return dispatch => {
      dispatch({
         type: NEW_ROUND
      });
      dispatch(checkAllCards());
   };
}

export function moveCard(from, to) {
   return dispatch => {
      dispatch({
         type: MOVE_CARD,
         move: {from: from, to: to}
      });
      dispatch(checkAllCards());
   }
}

export function undoMove() {
   return (dispatch, getState) => {
      const move = getState().undo.get('move');
      dispatch({
         type: UNDO_MOVE,
         move: move ? move.toJS() : null
      });
      dispatch(checkAllCards());
   }
}

function checkAllCards() {
   console.log('checkAllCards()');
   return (dispatch, getState) => {
      const {game, deck} = getState();
      const {round, rounds, moves} = game.toJS();

      let score = 0;
      let locked = 0;
      let placed = 0;
      let suit = null;

      deck.map((card, index) => {
         const previous = index > 0 ? deck.get(index - 1) : null;
         const isFirstInRow = index % 13 === 0;
         const roundPlaced = card.get('roundPlaced');

         suit = isCardPlaced(suit, card, index);
         if (suit) {
            if(!roundPlaced) {
               dispatch(setRoundPlaced(index, round));
            }
            score += getCardScore(card.get('value'), roundPlaced || round, rounds);
            placed++;
         }
         else if(roundPlaced) {
            dispatch(setRoundPlaced(index, null));
         }
         if (!isFirstInRow && isLockedGap(card, previous)) {
            locked++;
         }
      });

      score -= (round - 1) * 100;
      score -= moves * 5;

      dispatch({
         type: SET_SCORE,
         state: { placed, locked, score }
      });
   };
}

function isCardPlaced(suit, card, index) {
   const isFirstInRow = index % 13 === 0;
   const isTwo = card.get('value') === 2;
   const isPlaced = card.get('suit') == suit && card.get('value') === ((index % 13) + 2);

   if ((isFirstInRow && isTwo) || (!isFirstInRow && !isTwo && isPlaced)) {
      return card.get('suit');
   }
   return null;
}

function setRoundPlaced(index, round) {
   return {
      type: SET_ROUND_PLACED,
      index: index,
      roundPlaced: round
   };
}

function getCardScore(value, roundPlaced, rounds) {
   if (roundPlaced > 0) {
      if (value === 13) {
         return (rounds - roundPlaced + 1) * 60;
      }
      else if (value >= 10) {
         return (rounds - roundPlaced + 1) * 40;
      }
      else {
         return (rounds - roundPlaced + 1) * 20;
      }
   }
   return 0;
}

function isLockedGap(card, previous) {
   return card.get('value') === 1 && (previous.get('value') === 1 || previous.get('value') === 13);
}