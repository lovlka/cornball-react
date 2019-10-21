import { client, query, successResponse, errorResponse } from './faunadb';

function getStatistics(callback) {
  const index = query.Index('all_statistics');
  client.query(query.Paginate(query.Match(index)))
    .then(({ data }) => {
      client.query(data.map(ref => query.Get(ref)))
        .then(res => successResponse(res.map(r => r.data), callback))
        .catch(error => errorResponse(error, callback));
    })
    .catch(error => errorResponse(error, callback));
}

function putStatistics(body, callback) {
  const { name } = JSON.parse(body);
  const index = query.Index('statistics_by_name');
  client.query(query.Get(query.Match(index, name)))
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
