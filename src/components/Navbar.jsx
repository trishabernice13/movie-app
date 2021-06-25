import React from 'react';
import classNames from 'classnames';
import root from 'window-or-global';
import createRelativeComponent from '../helpers/createRelativeComponent';

class Navbar extends React.PureComponent {
  static defaultProps = {
    component: 'nav',
    left: null,
    right: null,
    center: null,
    position: 'top',
    isFixed: false,
    isFaded: false
  };

  get isFixedTop() {
    return this.props.isFixed && this.props.position === 'top';
  }

  get isFixedBottom() {
    return this.props.isFixed && this.props.position === 'bottom';
  }

  get classNames() {
    return classNames('navbar is-mobile', this.props.className, {
      'is-fixed-top': this.isFixedTop,
      'is-fixed-bottom': this.isFixedBottom,
      'is-faded': this.props.isFaded
    });
  }

  get body() {
    return root.document.getElementById('fave-body');
  }

  addContainerClassName() {
    if (this.props.isFixed && !this.props.isFaded && this.body) {
      this.body.classList.add(`with-navbar-fixed-${this.props.position}`);
    }
  }

  removeContainerClassName() {
    if (this.body) {
      this.body.classList.remove(`with-navbar-fixed-${this.props.position}`);
    }
  }

  componentDidMount() {
    this.addContainerClassName();
  }

  componentWillUnmount() {
    this.removeContainerClassName();
  }

  componentDidUpdate() {
    this.removeContainerClassName();
    this.addContainerClassName();
  }

  render() {
    const {
      component: Component,
      className,
      position,
      isFixed,
      isFaded,
      ...rest
    } = this.props;
    return (
      <Component className={this.classNames} {...rest}>
        {this.props.children}
      </Component>
    );
  }
}

createRelativeComponent(
  Navbar,
  'Item',
  ({ component: Component = 'span', className, ...rest }) => (
    <Component className={classNames('navbar-item', className)} {...rest} />
  )
);

createRelativeComponent(
  Navbar,
  'Menu',
  ({ component: Component = 'div', className, ...rest }) => (
    <Component className={classNames('navbar-menu', className)} {...rest} />
  )
);

export default Navbar;
