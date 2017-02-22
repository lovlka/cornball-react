import { postJson } from '../utils/network';
import { networkFailed } from './network';

export function gameStarted() {
   return dispatch => {
      return postJson('/statistics', {name: 'gamesStarted'})
         .catch(error => dispatch(networkFailed(error)));
   }
}