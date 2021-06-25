import React from 'react';
import debounce from 'lodash/debounce';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';

export default class MovieSearchView extends React.PureComponent {
  state = {
    query: ''
  };

  setStateDebounced = debounce(state => this.setState(state), 350);

  handleSearch = event => {
    this.setStateDebounced({ query: event.target.value });
  };

  get searchParams() {
    return {
      query: this.state.query,
      movieBy: "search",
      limit: 20,
    };
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar withBackLink onSearch={this.handleSearch} />
        {this.state.query === '' ? (
          <div className="section is-mobile">
            <div className="box is-radiusless has-text-centered">
            <p>
                What movie are you looking for{' '}
                <span role="img" aria-label="magnifying-glass">
                 🎬
                </span>
                {' '}?
              </p>
            </div>
          </div>
        ) : (
          <MovieList
            key={JSON.stringify(this.searchParams)}
            params={this.searchParams}
            emptyFragment={
              <div className="section is-mobile">
                <div className="box is-radiusless has-text-centered">
                <p>
                What movie are you looking for{' '}
                <span role="img" aria-label="magnifying-glass">
                 🎬
                </span>
                {' '}?
              </p>
                </div>
              </div>
            }
          />
        )}
      </React.Fragment>
    );
  }
}
