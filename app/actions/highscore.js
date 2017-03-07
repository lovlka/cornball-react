import { getJson } from '../utils/network';
import { networkProgress, resetNetwork, networkFailed } from './network';

export const HIGH_SCORE = 'HIGH_SCORE';

function updateHighScore(data) {
   return {
      type: HIGH_SCORE,
      state: {
         highScore: data
      }
   };
}

export function getHighScore() {
   return dispatch => {
      dispatch(networkProgress());
      return getJson('/highscore')
         .then(response => dispatch(updateHighScore(response.data)))
         .then(response => dispatch(resetNetwork()))
         .catch(error => dispatch(networkFailed(error)));
   }
}