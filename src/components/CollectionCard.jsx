import React from 'react';

import Image from '../components/Image';

const CollectionCard = ({
  name,
  component: Component = 'figure',
  image,
  ...rest
}) => (
  <Component className="image is-2by1 is-collection" {...rest}>
    <Image src={image} alt={name} className="is-outlined is-soft-rounded" />
  </Component>
);

export default CollectionCard;
