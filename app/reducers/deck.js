import Immutable from 'immutable';

import { NEW_GAME, NEW_ROUND, MOVE_CARD, UNDO_MOVE, SET_ROUND_PLACED } from '../actions/game';

export function deck(state = Immutable.List(), action = null) {
   switch (action.type) {
      case NEW_GAME:
         return Immutable.fromJS(shuffle(getDeck()));

      case NEW_ROUND:
         return Immutable.fromJS(reShuffle(state.toArray()));

      case MOVE_CARD:
      case UNDO_MOVE:
         const fromCard = state.get(action.move.from);
         const toGap = state.get(action.move.to);
         return state.set(action.move.to, fromCard).set(action.move.from, toGap);

      case SET_ROUND_PLACED:
         const card = state.get(action.index);
         const newCard = card.merge({ roundPlaced: action.roundPlaced });
         console.log('set round placed', action.index, card, newCard);
         return state.set(action.index, newCard);

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

function reShuffle(deck) {
   let index;
   let shuffle = [];
   for (index = 0; index < deck.length; index++) {
      if (!deck[index].roundPlaced) {
         shuffle.push(index);
      }
   }
   for (index = shuffle.length - 1; index >= 0; index--) {
      let random = Math.floor((Math.random() * index));
      swapCards(shuffle[random], shuffle[index]);
   }
   return deck;
}

function swapCards(deck, fromIndex, toIndex) {
   let temp = deck[fromIndex];
   deck[fromIndex] = deck[toIndex];
   deck[toIndex] = temp;
   return deck;
}

function getSuit(suit) {
   switch(suit) {
      case 1: return 'h';
      case 2: return 's';
      case 3: return 'd';
      case 4: return 'c';
   }
}
