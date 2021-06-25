import React from 'react';
import Observer from '@researchgate/react-intersection-observer';

export default class LoadMore extends React.PureComponent {
  handleIntersection = event => {
    if (event.isIntersecting) {
      this.props.onLoadNextPage(event);
    }
  };

  render() {
    return this.props.hasMorePages ? (
      <Observer key="waypoint" onChange={this.handleIntersection}>
        <span
          className="loader"
          style={{ margin: '1rem auto', fontSize: '1.5rem' }}
        />
      </Observer>
    ) : null;
  }
}
