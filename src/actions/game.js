import { gameStarted } from './statistics';

export const NEW_GAME = 'NEW_GAME';
export const NEW_ROUND = 'NEW_ROUND';
export const MOVE_CARD = 'MOVE_CARD';
export const UNDO_MOVE = 'UNDO_MOVE';
export const SHOW_HINT = 'SHOW_HINT';
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
         move: { from: from, to: to }
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

export function autoMoveCard(cardIndex) {
   return (dispatch, getState) => {
      const {deck} = getState();
      const card = deck.get(cardIndex);
      let index = findGap(deck, card);

      if (index !== -1) {
         dispatch(moveCard(cardIndex, index));
      }
   }
}

export function tryMoveCard(cardIndex, gapIndex) {
   return (dispatch, getState) => {
      const {deck} = getState();
      const card = deck.get(cardIndex);

      if(isCorrectGap(deck, gapIndex, card)) {
         dispatch(moveCard(cardIndex, gapIndex));
      }
   }
}

export function showHint(gapIndex) {
   return (dispatch, getState) => {
      const {deck} = getState();
      const index = findCard(deck, gapIndex);

      if(index !== -1) {
         dispatch({
            type: SHOW_HINT,
            index: index,
            showHint: true
         });
         setTimeout(function () {
            dispatch({
               type: SHOW_HINT,
               index: index,
               showHint: false
            });
         }, 1000);
      }
   }
}

function findCard(deck, gapIndex) {
   let index = -1;
   deck.map((card, cardIndex) => {
      if (isCorrectGap(deck, gapIndex, card)) {
         index = cardIndex;
      }
   });
   return index;
}

function findGap(deck, card) {
   let index = -1;
   deck.map((gap, gapIndex) => {
      if (gap.get('value') === 1 && isCorrectGap(deck, gapIndex, card)) {
         index = gapIndex;
      }
   });
   return index;
}

function isCorrectGap(deck, gapIndex, card) {
   const isGapFirstInRow = gapIndex % 13 === 0;
   const isCardValueTwo = card.get('value') === 2;
   const previous = gapIndex > 0 ? deck.get(gapIndex - 1) : null;
   const isSuitMatch = previous !== null && card.get('suit') === previous.get('suit');
   const isValueMatch = previous !== null && card.get('value') === previous.get('value') + 1;

   return (isGapFirstInRow && isCardValueTwo) || (!isGapFirstInRow && !isCardValueTwo && isSuitMatch && isValueMatch);
}

function checkAllCards() {
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
   const isValueTwo = card.get('value') === 2;
   const isPlaced = card.get('suit') === suit && card.get('value') === ((index % 13) + 2);

   if ((isFirstInRow && isValueTwo) || (!isFirstInRow && !isValueTwo && isPlaced)) {
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