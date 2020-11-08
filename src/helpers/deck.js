/* eslint-disable no-param-reassign */

export const ROWS = 4;
export const COLUMNS = 13;
export const CARDS = 48;
export const ACE = 1;
export const TWO = 2;
export const DRESSED = 10;
export const KING = 13;

export function getCardImagePath(suit, value) {
  const deckPath = require.context('../assets/deck');
  return deckPath(`./${suit}${value}.png`).default;
}

export function getDeck() {
  const deck = [];
  const suits = { 1: 'h', 2: 's', 3: 'd', 4: 'c' };

  for (let suit = 1; suit <= ROWS; suit += 1) {
    for (let value = 1; value <= COLUMNS; value += 1) {
      deck.push({
        suit: suits[suit],
        value
      });
    }
  }
  return deck;
}

function swapCards(deck, fromIndex, toIndex) {
  const temp = deck[fromIndex];
  deck[fromIndex] = deck[toIndex];
  deck[toIndex] = temp;
  return deck;
}

export function shuffle(deck) {
  for (let index = deck.length - 1; index >= 0; index -= 1) {
    const random = Math.floor((Math.random() * index));
    swapCards(deck, random, index);
  }
  return deck;
}

export function reShuffle(deck) {
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

export function swapImmutable(deck, from, to) {
  const fromCard = deck.get(from);
  const toGap = deck.get(to);
  return deck.set(to, fromCard).set(from, toGap);
}

export function updateCard(deck, index, state) {
  return deck.set(index, deck.get(index).merge(state));
}
