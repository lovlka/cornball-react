import 'dotenv/config';
import faunadb from 'faunadb';

const { query } = faunadb;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {
  const ref = query.Ref('indexes/all_statistics');
  client.query(query.Paginate(query.Match(ref)))
    .then((refs) => {
      const statistics = refs.data;
      const getStatistics = statistics.map(ref => query.Get(ref));
      client.query(getStatistics)
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
