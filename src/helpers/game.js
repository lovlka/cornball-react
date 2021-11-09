import { ACE, COLUMNS, DRESSED, KING, TWO } from './deck';

export function isCardPlaced(suit, card, index) {
  const isFirstInRow = index % COLUMNS === 0;
  const isValueTwo = card.get('value') === TWO;
  const isPlaced = card.get('suit') === suit && card.get('value') === ((index % COLUMNS) + 2);

  if ((isFirstInRow && isValueTwo) || (!isFirstInRow && !isValueTwo && isPlaced)) {
    return card.get('suit');
  }
  return null;
}

export function isCorrectGap(deck, gapIndex, card) {
  const isGapFirstInRow = gapIndex % COLUMNS === 0;
  const isCardValueTwo = card.get('value') === TWO;
  const previous = gapIndex > 0 ? deck.get(gapIndex - 1) : null;
  const isSuitMatch = previous !== null && card.get('suit') === previous.get('suit');
  const isValueMatch = previous !== null && card.get('value') === previous.get('value') + 1;

  return (isGapFirstInRow && isCardValueTwo) || (!isGapFirstInRow && !isCardValueTwo && isSuitMatch && isValueMatch);
}

export function isLockedGap(card, previous) {
  return card.get('value') === 1 && (previous.get('value') === 1 || previous.get('value') === KING);
}

export function findCards(deck, gapIndex) {
  const indexes = [];
  deck.forEach((card, cardIndex) => {
    if (isCorrectGap(deck, gapIndex, card) && !isCardPlaced(card.get('suit'), card, cardIndex)) {
      indexes.push(cardIndex);
    }
  });
  return indexes;
}

export function findGap(deck, card) {
  let index = -1;
  deck.forEach((gap, gapIndex) => {
    if (index === -1 && gap.get('value') === ACE && isCorrectGap(deck, gapIndex, card)) {
      index = gapIndex;
    }
  });
  return index;
}

export function getCardScore(value, roundPlaced, rounds) {
  if (roundPlaced > 0) {
    if (value === KING) {
      return (rounds - roundPlaced + 1) * 60;
    }
    if (value >= DRESSED) {
      return (rounds - roundPlaced + 1) * 40;
    }
    return (rounds - roundPlaced + 1) * 20;
  }
  return 0;
}
