import { client, query, successResponse, errorResponse } from './helpers/faunadb';

function getStatistics(callback) {
  const allStatistics = query.Map(
    query.Paginate(query.Match(query.Index('all_statistics'))),
    query.Lambda('document', query.Get(query.Var('document')))
  );
  client.query(allStatistics)
    .then(({ data }) => successResponse(data.map(d => d.data), callback))
    .catch(error => errorResponse(error, callback));
}

function putStatistics(body, callback) {
  const { name } = JSON.parse(body);
  const statisticsByName = query.Get(
    query.Match(query.Index('statistics_by_name'), name)
  );
  client.query(statisticsByName)
    .then(({ ref, data }) => {
      const update = { value: data.value + 1 };
      client.query(query.Update(ref, { data: update }))
        .then(() => successResponse(null, callback))
        .catch(error => errorResponse(error, callback));
    })
    .catch(error => errorResponse(error, callback));
}

exports.handler = (event, context, callback) => {
  switch (event.httpMethod) {
    case 'GET':
      getStatistics(callback);
      break;

    case 'PUT':
      putStatistics(event.body, callback);
      break;

    default:
      errorResponse(null, callback, 405);
      break;
  }
};
