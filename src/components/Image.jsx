import React from 'react';
import root from 'window-or-global';
import Observer from '@researchgate/react-intersection-observer';

export default class Image extends React.PureComponent {
  static defaultProps = {
    loadingStyle: { backgroundColor: '#dddddd' },
    loadedStyle: {}
  };

  static FALLBACK_IMAGE = require('../assets/images/carousel1.jpg');

  constructor(props) {
    super(props);
    this.image = new root.Image();
    this.image.onload = this.handleLoad;
    this.state = {
      isLoading: true
    };
  }

  render() {
    const {
      onLoad,
      onError,
      src,
      style,
      alt,
      loadedStyle,
      loadingStyle,
      ...rest
    } = this.props;

    return (
      <Observer onChange={this.handleIntersection}>
        <img
          src={this.state.isLoading ? Image.FALLBACK_IMAGE : src}
          alt={alt}
          style={{
            ...(this.state.isLoading ? loadingStyle : loadedStyle),
            ...style
          }}
          {...rest}
        />
      </Observer>
    );
  }

  handleIntersection = event => {
    if (event.isIntersecting && this.props.src) {
      this.image.src = this.props.src;
    }
  };

  handleLoad = event => {
    this.setState({
      isLoading: false
    });
    this.props.hasOwnProperty('onLoad') && this.props.onLoad(event);
  };
}
