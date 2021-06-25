import React from 'react';

export default class ScrollUp extends React.Component {
  componentDidMount() {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }

  render() {
    return this.props.children;
  }
}
