import React from 'react';
import { Location } from '@reach/router';
import qs from 'qs';

export const QueryStringContext = React.createContext();
export const QueryString = props => (
  <Location>
    {({ location }) => (
      <QueryStringContext.Provider
        value={qs.parse(location.search, { ignoreQueryPrefix: true })}
        {...props}
      />
    )}
  </Location>
);

export const withQueryString = Component => props => (
  <QueryStringContext.Consumer>
    {value => <Component {...value} {...props} />}
  </QueryStringContext.Consumer>
);
