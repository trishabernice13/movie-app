import Result from 'folktale/result';

export default function responseHandler(response) {
  const contentType = response.headers.get('content-type');
  const postSerializationCallback = serialized =>
    response.ok
      ? serialized
      : Promise.reject(
          Result.Error({ response: serialized, status: response.status })
        );

  if (contentType && contentType.includes('json')) {
    return response.json().then(postSerializationCallback);
  } else {
    return response.text().then(postSerializationCallback);
  }
}
