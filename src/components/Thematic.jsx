import React from 'react';
import { Link } from '@reach/router';
import MovieCard from './MovieCard';
import getMovies from '../queries/getMovies';

class Thematic extends React.PureComponent {
  state = {
    isLoading: true
  };

  componentDidMount() {
    getMovies({
      head: "discover/movie?", 
      sorting: "&sort_by=release_date.desc",
      end: "&region=SG&page=1&include_adult=false&include_video=false&release_date.gte=2021-06-01"
    }).then(response =>
      this.setState({isLoading:false, latests: response.results})
    )
  }

  render() {
    return (
      <>
        <div
          className="section is-mobile is-white"
          style={{ marginBottom: '1rem' }}
        >
          <div className="container">
            <h4
              className="is-size-4 has-text-weight-medium"
              style={{ marginBottom: '1rem' }}
            >
              Latest Releases
            </h4>
            
            {this.state.latests && this.state.latests.slice(0, 6).map(item => {
              return (
                <MovieCard
                key={item.id}
                component={Link}
                to={`/movies/${item.id}`}
                thumbnail={`http://image.tmdb.org/t/p/w400/${item.poster_path}`}
                title={item.title}
                releaseDate= {item.release_date}
                voteAvg={item.vote_average}
              />
              )
            }
             )}
              <Link
                to={`/latests/release_date.desc`}
                className="button is-link is-outlined is-borderless is-fullwidth"
              >
                <span>VIEW MORE</span>
                <span className="icon">
                  <i className="material-icons">arrow_forward</i>
                </span>
              </Link>
          </div>
        </div>
      </>
    );
  }
}



export default Thematic;