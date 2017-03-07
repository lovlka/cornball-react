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
   return dispatch => {
      dispatch(networkProgress());
      return getJson('/statistics')
         .then(response => dispatch(updateStatistics(response.data)))
         .then(response => dispatch(resetNetwork()))
         .catch(error => dispatch(networkFailed(error)));
   }
}

export function gameStarted() {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/statistics', {name: 'gamesStarted'})
         .then(result => dispatch(resetNetwork()))
         .catch(error => dispatch(networkFailed(error)));
   }
}