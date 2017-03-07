import { postJson } from '../utils/network';
import { networkProgress, resetNetwork, networkFailed } from './network';

export function gameStarted() {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/statistics', {name: 'gamesStarted'})
         .then(result => dispatch(resetNetwork()))
         .catch(error => dispatch(networkFailed(error)));
   }
}