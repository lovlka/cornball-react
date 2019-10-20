import 'dotenv/config';
import faunadb from 'faunadb';

const { query } = faunadb;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const highscore = query.Collections('highscore');
  client.query(query.Create(highscore, { data }))
    .then((response) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      });
    }).catch((error) => {
      console.log('ERROR', error);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      });
    });
};
