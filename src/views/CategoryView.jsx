import React from 'react';
import MovieList from '../components/MovieList';

class CategoryView extends React.PureComponent {
  state = {
    movies: [],
    isLoading: true
  };

  get searchParams() {
    return {
      type: this.props.type,
      movieBy: "sort",
      limit: 20,
    };
  }

  render() {
    return (
      <React.Fragment>
        <MovieList params={this.searchParams}/>
      </React.Fragment>
    );
  }
}

export default CategoryView;
