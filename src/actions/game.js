import { gameStarted } from './statistics';
import { findGap, findCards, getCardScore, isCardPlaced, isCorrectGap, isLockedGap } from '../helpers/game';
import { COLUMNS } from '../helpers/deck';

export const NEW_GAME = 'NEW_GAME';
export const NEW_ROUND = 'NEW_ROUND';
export const MOVE_CARD = 'MOVE_CARD';
export const UNDO_MOVE = 'UNDO_MOVE';
export const SHOW_HINT = 'SHOW_HINT';
export const SHOW_ERROR = 'SHOW_ERROR';
export const SET_SCORE = 'SET_SCORE';
export const SET_ROUND_PLACED = 'SET_ROUND_PLACED';

function setRoundPlaced(index, roundPlaced) {
  return { type: SET_ROUND_PLACED, index, roundPlaced };
}

function showHint(index, showHint) {
  return { type: SHOW_HINT, index, showHint };
}

function showError(index, showError) {
  return { type: SHOW_ERROR, index, showError };
}

function checkAllCards() {
  return (dispatch, getState) => {
    const { game, deck } = getState();
    const { round, rounds, moves } = game.toJS();

    let score = 0;
    let locked = 0;
    let placed = 0;
    let suit = null;

    deck.forEach((card, index) => {
      const previous = index > 0 ? deck.get(index - 1) : null;
      const isFirstInRow = index % COLUMNS === 0;
      const roundPlaced = card.get('roundPlaced');

      suit = isCardPlaced(suit, card, index);
      if (suit) {
        if (!roundPlaced) {
          dispatch(setRoundPlaced(index, round));
        }
        score += getCardScore(card.get('value'), roundPlaced || round, rounds);
        placed += 1;
      } else if (roundPlaced) {
        dispatch(setRoundPlaced(index, null));
      }
      if (!isFirstInRow && isLockedGap(card, previous)) {
        locked += 1;
      }
    });

    score -= (round - 1) * 100;
    score -= moves * 5;

    dispatch({ type: SET_SCORE, state: { placed, locked, score } });
  };
}

export function newGame() {
  return (dispatch) => {
    dispatch({ type: NEW_GAME });
    dispatch(gameStarted());
    dispatch(checkAllCards());
  };
}

export function newRound() {
  return (dispatch) => {
    dispatch({ type: NEW_ROUND });
    dispatch(checkAllCards());
  };
}

export function moveCard(from, to) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, move: { from, to } });
    dispatch(checkAllCards());
  };
}

export function undoMove() {
  return (dispatch, getState) => {
    const move = getState().undo.get('move');
    dispatch({ type: UNDO_MOVE, move: move ? move.toJS() : null });
    dispatch(checkAllCards());
  };
}

function timedAction(setAction, resetAction, timeout = 1000) {
  return (dispatch) => {
    dispatch(setAction);
    setTimeout(() => dispatch(resetAction), timeout);
  };
}

export function autoMoveCard(cardIndex) {
  return (dispatch, getState) => {
    const { deck } = getState();
    const card = deck.get(cardIndex);
    const index = findGap(deck, card);

    if (index !== -1) {
      dispatch(moveCard(cardIndex, index));
    } else {
      dispatch(timedAction(
        showError(cardIndex, true),
        showError(cardIndex, false)
      ));
    }
  };
}

export function tryMoveCard(cardIndex, gapIndex) {
  return (dispatch, getState) => {
    const { deck } = getState();
    const card = deck.get(cardIndex);

    if (isCorrectGap(deck, gapIndex, card)) {
      dispatch(moveCard(cardIndex, gapIndex));
    }
  };
}

export function tryShowHint(gapIndex) {
  return (dispatch, getState) => {
    const { deck } = getState();
    const indexes = findCards(deck, gapIndex);

    if (indexes.length > 0) {
      indexes.forEach((index) => {
        dispatch(timedAction(
          showHint(index, true),
          showHint(index, false)
        ));
      });
    } else {
      dispatch(timedAction(
        showError(gapIndex, true),
        showError(gapIndex, false)
      ));
    }
  };
}
