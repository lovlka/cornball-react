import { getJson, postJson } from '../helpers/network';

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
  return dispatch => getJson('/highscore')
    .then(({ data }) => dispatch(updateHighScore(data)));
}

export function getHighScores(start, end) {
  return dispatch => getJson(`/highscores/${start}/${end}`)
    .then(({ data }) => dispatch(updateHighScores(data)));
}

export function getAllTimeHigh() {
  return dispatch => getJson('/highscores')
    .then(({ data }) => dispatch(updateAllTimeHigh(data)));
}

export function saveHighScore(name, value) {
  return dispatch => postJson('/highscore', { name, value })
    .then(() => dispatch(getHighScore()));
}
