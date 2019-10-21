import { client, query, successResponse, errorResponse, mapHighscore } from './helpers/faunadb';

function getHighscores(callback) {
  const index = query.Index('all_highscore');
  client.query(query.Paginate(query.Match(index)))
    .then(({ data }) => {
      client.query(data.map(ref => query.Get(ref)))
        .then(res => successResponse(res.map(mapHighscore), callback))
        .catch(error => errorResponse(error, callback));
    })
    .catch(error => errorResponse(error, callback));
}

exports.handler = (event, context, callback) => {
  switch (event.httpMethod) {
    case 'GET':
      getHighscores(callback);
      break;

    default:
      errorResponse(null, callback, 405);
      break;
  }
};
