import { postJson } from './utils/network';

export const NETWORK = 'NETWORK';

export function networkProgress() {
   return {
      type: NETWORK,
      state: {
         networkProgress: true,
         networkFailed: false
      }
   };
}

export function networkFailed(error) {
   return {
      type: NETWORK,
      state: {
         networkProgress: false,
         networkFailed: true
      }
   };
}

export function resetNetwork() {
   return {
      type: NETWORK,
      state: {
         networkProgress: false,
         networkFailed: false
      }
   };
}

export function dummyMethod(data) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/dummy', data)
          .then(response => dispatch(resetNetwork()))
          .catch(error => dispatch(networkFailed(error)));
   }
}