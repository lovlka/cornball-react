import { client, query, successResponse, errorResponse, mapHighscore } from './helpers/faunadb';

function getHighscores(callback) {
  const allHighscore = query.Map(
    query.Paginate(query.Match(query.Index('all_highscore'))),
    query.Lambda('document', query.Get(query.Var('document')))
  );
  client.query(allHighscore)
    .then(({ data }) => successResponse(data.map(mapHighscore), callback))
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
