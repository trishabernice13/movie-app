import React from 'react';
import { Link } from '@reach/router';
import classNames from 'classnames';

import Navbar from '../components/Navbar';
import createRelativeComponent from '../helpers/createRelativeComponent';

const BottomBar = ({ city }) => (
  <Navbar isFixed position="bottom" className="is-bottom-bar">
    <Navbar.Menu>
      <BottomBar.Link to="/">
        <span className="icon">
          <i className="material-icons">home</i>
        </span>
      </BottomBar.Link>
      <BottomBar.Link to={`/collections`}>
        <span className="icon">
          <i className="material-icons">folder</i>
        </span>
      </BottomBar.Link>
    </Navbar.Menu>
  </Navbar>
);

createRelativeComponent(BottomBar, 'Link', ({ className, ...rest }) => (
  <Link
    {...rest}
    getProps={({ isCurrent }) => ({
      className: classNames(className, 'navbar-item is-expanded', {
        'is-active': isCurrent
      })
    })}
  />
));

export default BottomBar;
