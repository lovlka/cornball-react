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

function getPeriod(date) {
  return date.toISOString().substr(0, 7);
}

export function getHighScore() {
  const period = getPeriod(new Date());
  return dispatch => getJson(`/highscores/${period}`)
    .then(({ data }) => {
      dispatch(updateHighScore(data && data.length > 0 ? data[0] : null));
    });
}

export function getHighScores(date) {
  return dispatch => getJson(`/highscores/${getPeriod(date)}`)
    .then(({ data }) => dispatch(updateHighScores(data)));
}

export function getAllTimeHigh() {
  return dispatch => getJson('/highscores')
    .then(({ data }) => dispatch(updateAllTimeHigh(data)));
}

export function saveHighScore(name, score) {
  const period = getPeriod(new Date());
  return dispatch => postJson('/highscores', { name, score, period })
    .then(() => dispatch(getHighScore()));
}
