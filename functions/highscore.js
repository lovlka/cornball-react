import { client, query, successResponse, errorResponse, mapHighscore } from './helpers/faunadb';

function getHighscore(callback) {
  const index = query.Index('highscore_by_value');
  const select = query.Select('data', query.Paginate(query.Match(index)));
  client.query(query.Take(1, select))
    .then((res) => {
      const [, ref] = res[0];
      client.query(query.Get(ref))
        .then(ref => successResponse(mapHighscore(ref), callback))
        .catch(error => errorResponse(error, callback));
    })
    .catch(error => errorResponse(error, callback));
}

function postHighscore(body, callback) {
  const data = JSON.parse(body);
  const collection = query.Collection('highscore');
  client.query(query.Create(collection, data))
    .then(() => successResponse(null, callback))
    .catch(error => errorResponse(error, callback));
}

exports.handler = (event, context, callback) => {
  switch (event.httpMethod) {
    case 'GET':
      getHighscore(callback);
      break;

    case 'POST':
      postHighscore(event.body, callback);
      break;

    default:
      errorResponse(null, callback, 405);
      break;
  }
};
