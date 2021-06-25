import React from 'react';
import classNames from 'classnames';
import createRelativeComponent from '../helpers/createRelativeComponent';

const Card = ({ className, component: Component = 'div', ...rest }) => (
  <Component className={classNames('card', className)} {...rest} />
);

createRelativeComponent(
  Card,
  'Header',
  ({ className, component: Component = 'div', ...rest }) => (
    <Component className={classNames('card-header', className)} {...rest} />
  )
);

createRelativeComponent(
  Card.Header,
  'Title',
  React.forwardRef(
    ({ className, component: Component = 'h4', ...rest }, ref) => (
      <Component
        ref={ref}
        className={classNames(
          'card-header-title has-text-weight-medium is-size-5',
          className
        )}
        {...rest}
      />
    )
  )
);

createRelativeComponent(
  Card,
  'Footer',
  React.forwardRef(
    ({ className, component: Component = 'div', ...rest }, ref) => (
      <Component
        ref={ref}
        className={classNames('card-footer', className)}
        {...rest}
      />
    )
  )
);

createRelativeComponent(
  Card.Footer,
  'Item',
  React.forwardRef(
    ({ className, component: Component = 'div', ...rest }, ref) => (
      <Component
        ref={ref}
        className={classNames('card-footer-item', className)}
        {...rest}
      />
    )
  )
);

createRelativeComponent(
  Card,
  'Content',
  React.forwardRef(
    ({ className, component: Component = 'div', ...rest }, ref) => (
      <Component
        ref={ref}
        className={classNames('card-content', className)}
        {...rest}
      />
    )
  )
);

export default Card;
