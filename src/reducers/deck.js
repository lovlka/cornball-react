import Immutable from 'immutable';

import { NEW_GAME, NEW_ROUND, MOVE_CARD, UNDO_MOVE, SET_ROUND_PLACED, SHOW_HINT } from '../actions/game';

export function deck(state = Immutable.List(), action = null) {
  switch (action.type) {
    case NEW_GAME:
      return Immutable.fromJS(shuffle(getDeck()));

    case NEW_ROUND:
      return Immutable.fromJS(reShuffle(state.toJS()));

    case MOVE_CARD:
    case UNDO_MOVE:
      return swapImmutable(state, action.move.from, action.move.to);

    case SET_ROUND_PLACED:
      return updateCard(state, action.index, { roundPlaced: action.roundPlaced });

    case SHOW_HINT:
      return updateCard(state, action.index, { showHint: action.showHint });

    default:
      return state;
  }
}

function getDeck() {
  const deck = [];
  for (let suit = 1; suit <= 4; suit += 1) {
    for (let value = 1; value <= 13; value += 1) {
      deck.push({
        suit: getSuit(suit),
        value
      });
    }
  }
  return deck;
}

function shuffle(deck) {
  for (let index = deck.length - 1; index >= 0; index -= 1) {
    const random = Math.floor((Math.random() * index));
    swapCards(deck, random, index);
  }
  return deck;
}

function reShuffle(deck) {
  let index;
  const shuffle = [];
  for (index = 0; index < deck.length; index += 1) {
    if (!deck[index].roundPlaced) {
      shuffle.push(index);
    }
  }
  for (index = shuffle.length - 1; index >= 0; index -= 1) {
    const random = Math.floor((Math.random() * index));
    swapCards(deck, shuffle[random], shuffle[index]);
  }
  return deck;
}

function swapCards(deck, fromIndex, toIndex) {
  const temp = deck[fromIndex];
  deck[fromIndex] = deck[toIndex];
  deck[toIndex] = temp;
  return deck;
}

function swapImmutable(deck, from, to) {
  const fromCard = deck.get(from);
  const toGap = deck.get(to);
  return deck.set(to, fromCard).set(from, toGap);
}

function updateCard(deck, index, state) {
  return deck.set(index, deck.get(index).merge(state));
}

function getSuit(suit) {
  switch (suit) {
    case 1: return 'h';
    case 2: return 's';
    case 3: return 'd';
    case 4: return 'c';
  }
}
