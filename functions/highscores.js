import { client, query, successResponse, errorResponse, mapHighscore } from './helpers/faunadb';

function getHighscores(path, callback) {
  const period = path.match(/\d{4}-\d{2}/);
  const highscoreByPeriod = query.Map(
    query.Paginate(query.Match(query.Index('highscore_by_period'), period)),
    query.Lambda('index', query.Get(query.Var('index')))
  );
  const highscoreByScore = query.Map(
    query.Paginate(query.Match(query.Index('all_highscore'))),
    query.Lambda('index', query.Get(query.Var('index')))
  );
  client.query(period ? highscoreByPeriod : highscoreByScore)
    .then(({ data }) => successResponse(data.map(mapHighscore), callback))
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
      getHighscores(event.path, callback);
      break;

    case 'POST':
      postHighscore(event.body, callback);
      break;

    default:
      errorResponse(null, callback, 405);
      break;
  }
};
