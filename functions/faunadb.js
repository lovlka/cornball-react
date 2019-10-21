/* eslint-disable no-console */
import 'dotenv/config';
import faunadb from 'faunadb';

export const { query } = faunadb;
export const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

export function successResponse(response, callback) {
  callback(null, {
    statusCode: response ? 200 : 204,
    body: response && JSON.stringify(response)
  });
}

export function errorResponse(error, callback, statusCode = 400) {
  console.log(`ERROR: ${statusCode}`, error);
  callback(null, {
    statusCode,
    body: error && JSON.stringify(error)
  });
}

export function mapHighscore({ ts, data }) {
  return {
    date: new Date(ts / 1000),
    ...data
  };
}
