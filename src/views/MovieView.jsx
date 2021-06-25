import React from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import Image from '../components/Image';
import Card from '../components/Card';
import getMovieDetails from '../queries/getMovieDetails';
import placeholderImage from '../assets/images/placeholderImage.png';
import { parseInt } from 'window-or-global';

class MovieView extends React.PureComponent {
  static defaultProps = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
  state = {
    isLoading: true,
    month: '',
  };

  get searchParams() {
    return {
      id: this.props.id,
    };
  }

  fetchAll = () => {
    this.setState({ isLoading: true });
    Promise.all([this.fetchMovie()]).finally(() =>
      this.setState({
        isLoading: false,
      })
    );
  };

  fetchMovie = () =>
        getMovieDetails({
          movieId: this.searchParams.id
        }).then(response => 
          this.setState({
            movieTitle: response.title,
            movieTagline: response.tagline,
            movieReleaseDate: response.release_date,
            movieRuntime: response.runtime,
            movieRating: response.vote_average,
            movieOverview: response.overview,
            movieBackdrop: response.backdrop_path,
            movieGenres: response.genres
          })
          ).catch(e => {
            console.log(e);
          })

  componentDidMount() {
    this.fetchAll();
  }
  timeConverter = (duration) => {
    if(duration === 0){ return 'Not yet available'}

    let hours = Math.floor(duration/60) === 0? '' : Math.floor(duration/60);
    let minutes = duration % 60 === 0? '' : duration % 60;

    let hr = this.makePlural(hours, "hour")
    let min = this.makePlural(minutes, "minute")

    return `${hours} ${hr} ${minutes} ${min}`
  }
  makePlural = (value, type) => {
    return (value > 1 ? type + 's' : value === 1 ? type: '')
  }
  dateConverter = (date) => {
    let mm = parseInt(date.substring(5,7))
    let month = this.props.months[mm-1]
    return `${parseInt(date.substring(8,date.length))} ${month} ${date.substring(0,4)}` 
  }

  render() {
    return this.state.isLoading || this.state.movieTitle === null ? (
      <LoadingIndicator />
    ) : (
      <div style={{background: '#f1f2f3'}}>
        <Card style={{ marginBottom: '1rem'}}>
        <Card.Content style={{display: 'flex', justifyContent: 'center', backgroundColor: '#de206a'}}>
        <Image style={{width: '100vw'}}src={this.state.movieBackdrop ? `http://image.tmdb.org/t/p/w400/${this.state.movieBackdrop}` : placeholderImage}/>
        </Card.Content>
        </Card>
        <Card style={{ marginBottom: '1rem' }}>
          <Card.Content>
            <h1 className="is-size-4 has-text-weight-medium">
              {this.state.movieTitle}
            </h1>
            <p
              className="is-size-5 has-text-weight-medium"
              style={{ display: 'flex', marginBottom: '0.5rem' }}
            >
              {this.state.movieTagline}
            </p>
          </Card.Content>
        </Card>
        <Card style={{ marginBottom: '1rem' }}>
        <Card.Content>
          <p>
            Release Date: {this.dateConverter(this.state.movieReleaseDate)}
            <br/>
            Rating: {this.state.movieRating === 0 ? 'Not yet available' : `${this.state.movieRating} / 10`}
            <br/>
            Duration: {this.timeConverter(this.state.movieRuntime)}
          </p>
        </Card.Content>
        </Card>
        <Card style={{ marginBottom: '1rem' }}>
        <Card.Content >
          <div>
            <p>Genres:</p> 
            <div style={{overflow: 'scroll'}}>
            {this.state.movieGenres && this.state.movieGenres.map( genre => 
              <span key={genre.id} style={{backgroundColor: '#de206a', color: 'white', marginRight: '10px', padding: '3px', borderRadius: '5px'}}>{genre.name}</span>
            )}
            </div>
          </div>
        </Card.Content>
        </Card>
        <Card>
        <Card.Content>
        Overview: 
            <br/>
            {this.state.movieOverview}
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>

            <a
              href="https://www.cathaycineplexes.com.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="button is-success is-fullwidth is-large has-text-weight-medium"
              disabled={this.state.movieReleaseDate < '2021-06-01' || this.state.movieReleaseDate > '2021-08-01'? true: false}
            >
              BOOK MOVIE
              </a>
          </Card.Footer.Item>
        </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default MovieView;
