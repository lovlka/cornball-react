import Immutable from 'immutable';

import { NEW_GAME, NEW_ROUND, MOVE_CARD, UNDO_MOVE } from '../actions/game';

export function deck(state = Immutable.List(), action = null) {
   switch (action.type) {
      case NEW_GAME:
         return Immutable.fromJS(shuffle(getDeck()));

      default:
         return state;
   }
}

function getDeck() {
   let deck = [];
   for (let suit = 1; suit <= 4; suit++) {
      for (let value = 1; value <= 13; value++) {
         deck.push({
            suit: getSuit(suit),
            value: value
         });
      }
   }
   return deck;
}

function shuffle(deck) {
   for (let index = deck.length - 1; index >= 0; index--) {
      let random = Math.floor((Math.random() * index));
      swapCards(deck, random, index);
   }
   return deck;
}

function swapCards(deck, fromIndex, toIndex) {
   let temp = deck[fromIndex];
   deck[fromIndex] = deck[toIndex];
   deck[toIndex] = temp;
}

function getSuit(suit) {
   switch(suit) {
      case 1: return 'h';
      case 2: return 's';
      case 3: return 'd';
      case 4: return 'c';
   }
}