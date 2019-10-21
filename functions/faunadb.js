
import 'dotenv/config';
import faunadb from 'faunadb';

export const { query } = faunadb;
export const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

export function successResponse(response, callback) {
  callback(null, {
    statusCode: response ? 200 : 204,
    body: response
      ? JSON.stringify(response.map(r => r.data))
      : null
  });
}

export function errorResponse(error, callback, statusCode = 400) {
  console.log('ERROR', error);
  callback(null, {
    statusCode,
    body: JSON.stringify(error)
  });
}
