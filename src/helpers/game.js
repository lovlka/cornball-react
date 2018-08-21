
export function isCardPlaced(suit, card, index) {
  const isFirstInRow = index % 13 === 0;
  const isValueTwo = card.get('value') === 2;
  const isPlaced = card.get('suit') === suit && card.get('value') === ((index % 13) + 2);

  if ((isFirstInRow && isValueTwo) || (!isFirstInRow && !isValueTwo && isPlaced)) {
    return card.get('suit');
  }
  return null;
}

export function isCorrectGap(deck, gapIndex, card) {
  const isGapFirstInRow = gapIndex % 13 === 0;
  const isCardValueTwo = card.get('value') === 2;
  const previous = gapIndex > 0 ? deck.get(gapIndex - 1) : null;
  const isSuitMatch = previous !== null && card.get('suit') === previous.get('suit');
  const isValueMatch = previous !== null && card.get('value') === previous.get('value') + 1;

  return (isGapFirstInRow && isCardValueTwo) || (!isGapFirstInRow && !isCardValueTwo && isSuitMatch && isValueMatch);
}

export function isLockedGap(card, previous) {
  return card.get('value') === 1 && (previous.get('value') === 1 || previous.get('value') === 13);
}


export function findCard(deck, gapIndex) {
  let index = -1;
  deck.forEach((card, cardIndex) => {
    if (isCorrectGap(deck, gapIndex, card)) {
      index = cardIndex;
    }
  });
  return index;
}

export function findGap(deck, card) {
  let index = -1;
  deck.forEach((gap, gapIndex) => {
    if (gap.get('value') === 1 && isCorrectGap(deck, gapIndex, card)) {
      index = gapIndex;
    }
  });
  return index;
}

export function getCardScore(value, roundPlaced, rounds) {
  if (roundPlaced > 0) {
    if (value === 13) {
      return (rounds - roundPlaced + 1) * 60;
    }
    if (value >= 10) {
      return (rounds - roundPlaced + 1) * 40;
    }
    return (rounds - roundPlaced + 1) * 20;
  }
  return 0;
}
