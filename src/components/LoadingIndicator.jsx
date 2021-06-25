import React from 'react';
import classNames from 'classnames';

const LoadingIndicator = React.forwardRef(({ className }, ref) => (
  <section className="section" ref={ref}>
    <span
      className={classNames('loader', className)}
      style={{
        margin: 'auto',
        fontSize: '2rem'
      }}
    />
  </section>
));

export default LoadingIndicator;
