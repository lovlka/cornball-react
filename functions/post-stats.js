import faunadb from 'faunadb';

const { query } = faunadb;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const ref = query.Ref('classes/stats');
  return client.query(query.Create(ref, { data }))
    .then(response => callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })).catch(error => callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    }));
};
