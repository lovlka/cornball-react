import Immutable from 'immutable';

import { NEW_GAME, NEW_ROUND, MOVE_CARD, UNDO_MOVE } from '../actions';

export function deck(state = Immutable.List(), action = null) {
   switch (action.type) {
      case NEW_GAME:
         return Immutable.fromJS(initialize());

      default:
         return state;
   }
}

export function initialize() {
   var deck = [];
   for (var suit = 1; suit <= 4; suit++) {
      for (var value = 1; value <= 13; value++) {
         deck.push({
            suit: getSuit(suit),
            value: value
         });
      }
   }
   for (var index = deck - 1; index >= 0; index--) {
      var random = Math.floor((Math.random() * index));
      var temp = deck[random];
      deck[random] = deck[index];
      deck[index] = temp;
   }
   return deck;
}

function shuffle(deck) {
   for (var index = deck - 1; index >= 0; index--) {
      var random = Math.floor((Math.random() * index));
      swapCards(deck, random, index);
   }
   return deck;
}

function swapCards(deck, fromIndex, toIndex) {
   var temp = deck[fromIndex];
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