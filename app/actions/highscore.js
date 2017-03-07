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

function updateHighScores(data) {
   return {
      type: HIGH_SCORE,
      state: {
         highScores: data
      }
   };
}

function updateAllTimeHigh(data) {
   return {
      type: HIGH_SCORE,
      state: {
         allTimeHigh: data
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

export function getHighScores(start, end) {
   return dispatch => {
      dispatch(networkProgress());
      return getJson('/highscores/' + start + '/' + end)
         .then(response => dispatch(updateHighScores(response.data)))
         .then(response => dispatch(resetNetwork()))
         .catch(error => dispatch(networkFailed(error)));
   }
}

export function getAllTimeHigh() {
   return dispatch => {
      dispatch(networkProgress());
      return getJson('/highscores')
         .then(response => dispatch(updateAllTimeHigh(response.data)))
         .then(response => dispatch(resetNetwork()))
         .catch(error => dispatch(networkFailed(error)));
   }
}
