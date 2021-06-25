import React from 'react';
import MovieList from '../components/MovieList';
import LoadingIndicator from '../components/LoadingIndicator';

export default class SectionView extends React.PureComponent {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  get searchParams() {
    return {
      type: this.props.type,
      limit: 20,
    };
  }

  render() {
    if (this.state.isLoading) return <LoadingIndicator />;
    return (
      <div className="section is-mobile is-white">
        <div className="container">
          <MovieList
            key={JSON.stringify(this.searchParams)}
            params={this.searchParams}
          />
        </div>
      </div>
    );
  }
}
