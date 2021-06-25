import React from 'react';
import classNames from 'classnames';
import Observer from '@researchgate/react-intersection-observer';
import LoadMore from './LoadMore';

import { Link } from '@reach/router';
import times from 'lodash/times';
import MovieCard from './MovieCard';
import createRelativeComponent from '../helpers/createRelativeComponent';
import getMovies from '../queries/getMovies';
import getSearchListings from '../queries/getSearchListings';
import Paginator from '../helpers/Paginator';

export default class MovieList extends React.PureComponent {

  static defaultProps = {
    params: {},
    defaultItems: null,
    isHalted: false
  };
  state = {
    items: Array.isArray(this.props.defaultItems)
      ? this.props.defaultItems
      : [],
    total: Array.isArray(this.props.defaultItems)
      ? this.props.defaultItems.length
      : 0,
    isLoading: !Array.isArray(this.props.defaultItems) 
  }

  isIntersected = false;
  
  getCorrespondingMovieData = (movieBy, page) => {
    switch (movieBy) {
      case 'search':
        return getSearchListings({ searchQuery: this.props.params.query})
      case 'collection':
        return getMovies({ 
          page, 
          head: `movie/${this.props.params.type}?`,
          sorting: "",
          end: `&page=${page}`,
          ...this.props.params})
      case 'sort':
        return getMovies({ 
          page,
          head: "discover/movie?", 
          sorting: `&sort_by=${this.props.params.type}`,
          end: `&region=SG&page=${page}&include_adult=false&include_video=false&release_date.gte=2021-06-01`,
           ...this.props.params })
      default:
        return getMovies({ 
          page,
          head: "discover/movie?", 
          sorting: `&sort_by=${this.props.params.type}`,
          end: `&region=SG&page=${page}&include_adult=false&include_video=false&release_date.gte=2021-06-01`,
           ...this.props.params })
    }
  };

  
  paginator = new Paginator(this.adapter);

  get adapter() {
    return {
      getPageData: page =>
        this.getCorrespondingMovieData(this.props.params.movieBy, page),
      getTotalPage: response =>
        Math.ceil(response.total_results / this.props.params.limit),
      onPageLoad: response => {
        this.setState(prevState => ({
          isLoading: false,
          total: response.total_results,
          items:
            this.paginator.page === 1
              ? response.results
              : [...prevState.items, ...response.results]
        }));
      }
    };
  }


  handleIntersection = event => {
    this.isIntersected = event.isIntersecting;
    if (event.isIntersecting && !this.props.isHalted) {
      this.paginator.loadPage(1);
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.isHalted !== this.props.isHalted &&
      !this.props.isHalted &&
      this.isIntersected
    ) {
      this.paginator.loadPage(1);
    }
  }

  componentWillUnmount() {
    // fix Can't perform a React state update on an unmounted component.
    this.setState = () => {};
  }

  render() {
    const { isLoading, items, total } = this.state;
    const { children, params, isHalted } = this.props;
    const { nextPage, prevPage, loadPage, hasMorePages } = this.paginator;

    if (typeof children === 'function')
      return children({
        isLoading,
        items,
        total,
        nextPage,
        prevPage,
        loadPage,
        hasMorePages,
        params,
        isHalted
      });

    if (isLoading)
      return (
        <Observer onChange={this.handleIntersection}>
          <MovieList.Placeholder />
        </Observer>
      );

    if (!items.length) return <MovieList.Empty />;

    return (
      <>
      {
        items.map((movie, i) => (
          <MovieCard
            key={i}
            component={Link}
            to={`/movies/${movie.id}`}
            thumbnail={`http://image.tmdb.org/t/p/w400/${movie.poster_path}`}
            title= {movie.title}
            releaseDate={movie.release_date}
            voteAvg={movie.vote_average}
            />
          )
        )
      }
      <LoadMore
        hasMorePages={this.paginator.hasMorePages}
        onLoadNextPage={this.paginator.nextPage}
      /> 
      </>
    );
  }
}

createRelativeComponent(
  MovieList,
  'Placeholder',
  React.forwardRef((props, ref) => (
    <section ref={ref} {...props}>
      {times(3).map(i => (
        <MovieCard.Placeholder key={i} />
      ))}
    </section>
  ))
);

createRelativeComponent(
  MovieList,
  'Empty',
  React.forwardRef(({ className, ...rest }, ref) => (
    <div
      ref={ref}
      className={classNames('section is-mobile', className)}
      {...rest}
    >
      <div className="box is-radiusless has-text-centered">
        Sorry, but we couldn't find any matching movies
      </div>
    </div>
  ))
);
