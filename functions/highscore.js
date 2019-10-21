import { client, query, successResponse, errorResponse, mapHighscore } from './helpers/faunadb';

function getHighscore(callback) {
  const highScoreByValue = query.Select('data', query.Paginate(
    query.Match(query.Index('highscore_by_value'))
  ));
  client.query(query.Take(1, highScoreByValue))
    .then((res) => {
      const [, ref] = res[0];
      client.query(query.Get(ref))
        .then(ref => successResponse(mapHighscore(ref), callback))
        .catch(error => errorResponse(error, callback));
    })
    .catch(error => errorResponse(error, callback));
}

function postHighscore(body, callback) {
  const createHighscore = query.Create(
    query.Collection('highscore'),
    JSON.parse(body)
  );
  client.query(createHighscore)
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
