import { db, increment } from '../helpers/firebase';

export const STATISTICS = 'STATISTICS';

function updateStatistics(statistics) {
  return {
    type: STATISTICS,
    state: {
      statistics
    }
  };
}

export function fetchStatistics() {
  return dispatch => db.collection('statistics').get()
    .then((query) => {
      const statistics = [];
      query.forEach(item => statistics.push({
        name: item.id,
        ...item.data()
      }));
      dispatch(updateStatistics(statistics));
    });
}

function increaseStatistics(property) {
  return () => db.collection('statistics').doc(property)
    .update({ value: increment(1) });
}

export function gameStarted() {
  return increaseStatistics('gamesStarted');
}

export function gameWon(round) {
  return increaseStatistics(`gamesWonRound${round}`);
}

export function gameLost() {
  return increaseStatistics('gamesLost');
}
