import Movie from '../integrations/Movie';

 const getMovies = ({head, sorting, end, ...params}) => {
    return Movie.get(`${head}api_key=${process.env.REACT_APP_API_KEY}${sorting}${end}`, params)
}

export default getMovies;
