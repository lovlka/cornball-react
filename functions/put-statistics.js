import 'dotenv/config';
import faunadb from 'faunadb';

const { query } = faunadb;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const ref = query.Ref('indexes/statistics_by_name', data.name);
  client.query(query.Get(ref))
    .then((statistic) => {
      console.log('GOT', statistic);
      const data = { value: statistic.value + 1 };
      client.query(query.Update(ref, { data }))
        .then((response) => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(response)
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
