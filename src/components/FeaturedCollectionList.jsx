import React from 'react';
import Observer from '@researchgate/react-intersection-observer';
import { Link } from '@reach/router';
import CollectionCard from '../components/CollectionCard';
import Image from '../components/Image';
import createRelativeComponent from '../helpers/createRelativeComponent';
import popularImg from '../assets/images/collections/popular.png';
import upcomingImg from '../assets/images/collections/upcoming.png';

class FeaturedCollectionList extends React.PureComponent {
  state = {
    isLoading: true
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
          <FeaturedCollectionList.Placeholder />
        </Observer>
      );

    return (
      <div className="section is-mobile is-white">
        <div className="container">
          <h4
            className="is-size-4 has-text-weight-medium"
            style={{ marginBottom: '1rem' }}
          >
            Movie Collections
          </h4>
          <CollectionCard
            component={Link}
            to={`/collections/popular`}
            image={popularImg} 
          />
          <CollectionCard
            component={Link}
            to={`/collections/upcoming`}
            image={upcomingImg}
          />
        </div>

      </div>
    );
  }
}

createRelativeComponent(
  FeaturedCollectionList,
  'Placeholder',
  React.forwardRef((props, ref) => (
    <section ref={ref} {...props}>
      <div className="section is-mobile is-white has-placeholder">
        <div className="container">
          <div
            className="placeholder is-line is-two-fifths is-size-4"
            style={{ marginBottom: '1rem' }}
          />
          <figure className="image is-2by1">
            <Image className="is-outlined" />
          </figure>
        </div>
      </div>
    </section>
  ))
);

export default FeaturedCollectionList;
