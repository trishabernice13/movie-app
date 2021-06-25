import React from 'react';
import root from 'window-or-global';
import classNames from 'classnames';
import Navbar from '../components/Navbar';
import createRelativeComponent from '../helpers/createRelativeComponent';
import styles from '../assets/css/components/TopBar.module.scss';

const isFunction = d => typeof d === 'function';
const maybeFun = (fn, props) => (isFunction(fn) ? fn(props) : fn);

const TopBar = ({
  left = <TopBar.DefaultFragment />,
  center,
  right = <TopBar.DefaultFragment />,
  isFaded = false,
  justifyCenter,
  ...rest
}) => (
  <Navbar isFixed isFaded={isFaded} position="top">
    <Navbar.Menu
      className={classNames(styles.navbarMenu, {
        [styles.center]: maybeFun(justifyCenter, rest)
      })}
    >
      {maybeFun(left, rest)}
      <Navbar.Item
        className={classNames(styles.navbarHeader, isFaded && styles.isFaded)}
        children={maybeFun(center, rest)}
      />
      {maybeFun(right, rest)}
    </Navbar.Menu>
  </Navbar>
);

createRelativeComponent(TopBar, 'Icon', ({ className, children, ...rest }) => (
  <span className={classNames('icon', className)} {...rest}>
    <i className="material-icons">{children}</i>
  </span>
));

createRelativeComponent(
  TopBar,
  'BackLink',
  ({ isOnFaded, styleName, onClick = () => root.history.back(), ...props }) => (
    <Navbar.Item
      data-nav-link
      className={classNames(props.className, styles[styleName])}
      onClick={onClick}
    >
      <TopBar.Icon className={`has-text-${isOnFaded ? 'white' : 'grey-dark'}`}>
        arrow_back
      </TopBar.Icon>
    </Navbar.Item>
  )
);

createRelativeComponent(TopBar, 'DefaultFragment', ({ isOnFaded = false }) => (
  <Navbar.Item>
    <TopBar.Icon />
  </Navbar.Item>
));

export default TopBar;
