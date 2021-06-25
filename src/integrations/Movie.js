import responseHandler from '../helpers/responseHandler';

export default class Movie {
  state = {
    movieList: []
  }
  
  static request(resource, request, init = {}) {
    return fetch(`https://api.themoviedb.org/3/${resource}`)
    .then(responseHandler);
  }

  static get(resource, request, init = {}) {
    init.method = 'GET';
    return Movie.request(resource);
  }
}
