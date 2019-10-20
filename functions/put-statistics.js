import 'dotenv/config';
import faunadb from 'faunadb';

const { query } = faunadb;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {
  if (event.httpMethod !== 'PUT') {
    callback(null, { statusCode: 405 });
    return;
  }
  const body = JSON.parse(event.body);
  const index = query.Index('statistics_by_name');
  client.query(query.Get(query.Match(index, body.name)))
    .then((statistic) => {
      const { ref, data } = statistic;
      const update = { value: data.value + 1 };
      client.query(query.Update(ref, { data: update }))
        .then(() => {
          callback(null, {
            statusCode: 204
          });
        }).catch((error) => {
          console.log('ERROR', error);
          callback(null, {
            statusCode: 400,
            body: JSON.stringify(error)
          });
        });
    }).catch((error) => {
      console.log('ERROR', error);
      callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      });
    });
};
