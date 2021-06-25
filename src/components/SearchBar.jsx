import React from 'react';
import { Link } from '@reach/router';
import root from 'window-or-global';
import faveLogo from '../assets/images/fave.svg';
import Navbar from '../components/Navbar';


const SearchBar = ({
  withBackLink = false,
  searchPath = '/movies',
  city,
  onSearch,
  placeholder = 'Search for movies',
}) => {
  const handleKeyPress = event => {
    // Fix: For Android phones when user presses Enter
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };

  return (
    <Navbar isFixed position="top" className="is-branded is-dense">

      <Navbar.Menu>
        {withBackLink ? (
          <Navbar.Item onClick={() => root.history.back()}>
            <span className="icon">
              <i className="material-icons">arrow_back</i>
            </span>
          </Navbar.Item>
        ) : (
          <Navbar.Item component={Link} to="/">
            <img
              alt="Fave"
              src={faveLogo}
              style={{ padding: '0.05rem' }}
            />
          </Navbar.Item>
        )}
        <Navbar.Item
          component={onSearch ? 'div' : Link}
          className="navbar-item search-box is-expanded is-stateless"
          to={onSearch ? undefined : searchPath.replace(':city', city)}
        >
          <div className="control has-icons-left" style={{ flexGrow: 1 }}>
            <span className="icon search-icon">
              <i className="material-icons">search</i>
            </span>
            <input
              className="input is-shadowless"
              style={{ border: 'none' }}
              placeholder={placeholder}
              onChange={onSearch}
              onKeyPress={handleKeyPress}
              autoFocus={onSearch ? true : false}
            />
          </div>
        </Navbar.Item>
      </Navbar.Menu>
    </Navbar>
  );
};

export default SearchBar;
