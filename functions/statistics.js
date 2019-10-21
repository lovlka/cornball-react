import { client, query, successResponse, errorResponse } from './faunadb';

function getStatistics(event, callback) {
  const ref = query.Ref('indexes/all_statistics');
  client.query(query.Paginate(query.Match(ref)))
    .then((refs) => {
      const statistics = refs.data;
      const getStatistics = statistics.map(ref => query.Get(ref));
      client.query(getStatistics)
        .then(response => successResponse(response, callback))
        .catch(error => errorResponse(error, callback));
    })
    .catch(error => errorResponse(error, callback));
}

function putStatistics(event, callback) {
  const body = JSON.parse(event.body);
  const index = query.Index('statistics_by_name');
  client.query(query.Get(query.Match(index, body.name)))
    .then((statistic) => {
      const { ref, data } = statistic;
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
      getStatistics(event, callback);
      break;

    case 'PUT':
      putStatistics(event, callback);
      break;

    default:
      callback(null, { statusCode: 405 });
      break;
  }
};
