import { getJson, putJson } from '../helpers/network';

export const STATISTICS = 'STATISTICS';

function updateStatistics(data) {
  return {
    type: STATISTICS,
    state: {
      statistics: data
    }
  };
}

export function getStatistics() {
  return dispatch => getJson('/get-statistics')
    .then(({ data }) => dispatch(updateStatistics(data)));
}

function increaseStatistics(property) {
  return () => putJson('/put-statistics', { name: property });
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
