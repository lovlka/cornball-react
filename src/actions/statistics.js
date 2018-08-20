import { getJson, postJson } from '../utils/network';
import { networkProgress, resetNetwork, networkFailed } from './network';

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
  return (dispatch) => {
    dispatch(networkProgress());
    return getJson('/statistics')
      .then(response => dispatch(updateStatistics(response.data)))
      .then(response => dispatch(resetNetwork()))
      .catch(error => dispatch(networkFailed(error)));
  };
}

export function gameStarted() {
  return (dispatch) => {
    dispatch(increaseStatistics('gamesStarted'));
  };
}

export function gameWon(round) {
  return (dispatch) => {
    dispatch(increaseStatistics(`gamesWonRound${round}`));
  };
}

export function gameLost() {
  return (dispatch) => {
    dispatch(increaseStatistics('gamesLost'));
  };
}

function increaseStatistics(property) {
  return (dispatch) => {
    dispatch(networkProgress());
    return postJson('/statistics', { name: property })
      .then(result => dispatch(resetNetwork()))
      .catch(error => dispatch(networkFailed(error)));
  };
}
