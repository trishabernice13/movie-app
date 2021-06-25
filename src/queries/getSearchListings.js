import Movie from '../integrations/Movie';

 const getSearchListings = ({searchQuery, ...params}) => {
    return Movie.get(`search/movie?${process.env.REACT_APP_API_KEY}&query=${searchQuery}&include_adult=false`, params)
}

export default getSearchListings;
