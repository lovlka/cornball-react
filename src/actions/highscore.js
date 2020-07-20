import { db } from '../helpers/firebase';

export const HIGH_SCORE = 'HIGH_SCORE';

function updateHighScore(highScore) {
  return {
    type: HIGH_SCORE,
    state: {
      highScore
    }
  };
}

function updateHighScores(highScores) {
  return {
    type: HIGH_SCORE,
    state: {
      highScores
    }
  };
}

function updateAllTimeHigh(allTimeHigh) {
  return {
    type: HIGH_SCORE,
    state: {
      allTimeHigh
    }
  };
}

function getPeriod(date) {
  return date.toISOString().substr(0, 7);
}

function getDate(date) {
  return date.toISOString().substr(0, 10);
}

export function getHighScore() {
  const period = getPeriod(new Date());
  return dispatch => db.collection('highscore')
    .where('period', '==', period)
    .orderBy('score', 'desc').limit(1).get()
    .then(query => query.forEach((item) => {
      dispatch(updateHighScore(item.data()));
    }));
}

export function getHighScores(date) {
  return dispatch => db.collection('highscore')
    .where('period', '==', getPeriod(date))
    .orderBy('score', 'desc').limit(10).get()
    .then((query) => {
      const highScores = [];
      query.forEach(item => highScores.push(item.data()));
      dispatch(updateHighScores(highScores));
    });
}

export function getAllTimeHigh() {
  return dispatch => db.collection('highscore')
    .orderBy('score', 'desc').limit(10).get()
    .then((query) => {
      const allTimeHigh = [];
      query.forEach(item => allTimeHigh.push(item.data()));
      dispatch(updateAllTimeHigh(allTimeHigh));
    });
}

export function saveHighScore(name, score) {
  const date = getDate(new Date());
  const period = getPeriod(new Date());
  return dispatch => db.collection('highscore')
    .add({ name, score, period, date })
    .then(() => dispatch(getHighScore()));
}
