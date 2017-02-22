export const DECK = 'DECK';

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
   return {
      type: DECK,
      deck: deck
   };
}

function getSuit(suit) {
   switch(suit) {
      case 1: return 'h';
      case 2: return 's';
      case 3: return 'd';
      case 4: return 'c';
   }
}