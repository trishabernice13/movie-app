import Movie from '../integrations/Movie';

 const getMovieDetails = ({movieId, ...params}) => {
    return Movie.get(`movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
}

export default getMovieDetails;
