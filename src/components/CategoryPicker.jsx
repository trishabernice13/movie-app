import React from 'react';
import times from 'lodash/times';
import Observer from '@researchgate/react-intersection-observer';
import { Link } from '@reach/router';
import star from '../assets/images/vectors/symbol/main/star.svg';
import emptyStar from '../assets/images/vectors/symbol/main/empty-star.svg';
import latest from '../assets/images/vectors/symbol/main/full-hourglass.svg';
import oldest from '../assets/images/vectors/symbol/main/hourglass.svg';
import atoz from '../assets/images/vectors/symbol/main/atoz.svg';
import ztoa from '../assets/images/vectors/symbol/main/ztoa.svg';
import createRelativeComponent from '../helpers/createRelativeComponent';

class CategoryPicker extends React.PureComponent {
  state = {
    isLoading: true,
  };

  handleIntersection = event => {
    if (event.isIntersecting) {
      this.setState({isLoading: false})
    }
  };

  render() {
    if (this.state.isLoading)
      return (
        <Observer onChange={this.handleIntersection}>
          <CategoryPicker.Placeholder />
        </Observer>
      );

    return (
      
      <div className="section is-white is-mobile">
        <div className="container">
        <br/>
          <div className="columns is-multiline is-mobile">      
            <div className="column is-4 is-flex">
              <Link
                  to={`/categories/release_date.desc`}
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: '#363636'
                  }}
                >
                  <img
                    alt= "Category"
                    className="icon main-category"
                    src={latest}
                  />
                  <h6 className="has-text-centered">Latest Release</h6>
              </Link>
            </div>
            <div className="column is-4 is-flex">
              <Link
                  to={`/categories/release_date.asc`}
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: '#363636'
                  }}
                >
                  <img
                    alt= "Category"
                    className="icon main-category"
                    src={oldest}
                  />
                  <h6 className="has-text-centered">Oldest Release</h6>
              </Link>
            </div>
            <div className="column is-4 is-flex">
              <Link
                  to={`/categories/vote_average.desc`}
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: '#363636'
                  }}
                >
                  <img
                    alt= "Category"
                    className="icon main-category"
                    src={star}
                  />
                  <h6 className="has-text-centered">Highest Rating</h6>
              </Link>
            </div>
            <div className="column is-4 is-flex">
              <Link
                  to={`/categories/vote_average.asc`}
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: '#363636'
                  }}
                >
                  <img
                    alt= "Category"
                    className="icon main-category"
                    src={emptyStar}
                  />
                  <h6 className="has-text-centered">Lowest Rating</h6>
              </Link>
            </div>
            <div className="column is-4 is-flex">
              <Link
                  to={`/categories/original_title.asc`}
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: '#363636'
                  }}
                >
                  <img
                    alt= "Category"
                    className="icon main-category"
                    src={atoz}
                  />
                  <h6 className="has-text-centered">A to Z</h6>
              </Link>
            </div>
            <div className="column is-4 is-flex">
              <Link
                  to={`/categories/original_title.desc`}
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    color: '#363636'
                  }}
                >
                  <img
                    alt= "Category"
                    className="icon main-category"
                    src={ztoa}
                  />
                  <h6 className="has-text-centered">Z to A</h6>
              </Link>
            </div>
              
          </div>
        </div>
      </div>
    );
  }
}

createRelativeComponent(
  CategoryPicker,
  'Placeholder',
  React.forwardRef((props, ref) => (
    <div ref={ref} className="section is-white is-mobile" {...props}>
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {times(8).map((_, i) => (
            <div key={i} className="column is-3 is-flex">
              <div
                style={{
                  textAlign: 'center',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <span
                  className="icon is-large placeholder is-override"
                  style={{ borderRadius: '50%' }}
                />
                <div style={{ padding: '0.25rem' }} />
                <span className="placeholder is-line is-three-fifths" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ))
);

export default CategoryPicker;
