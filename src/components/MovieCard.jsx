import React from 'react';
import Image from './Image';
import createRelativeComponent from '../helpers/createRelativeComponent';
import placeHolderImage from '../assets/images/placeholderImage.png';

const MovieCard = ({
  thumbnail,
  component: Component = 'div',
  title,
  releaseDate,
  voteAvg,
  ...rest
}) => {

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const dateConverter = (date) => {
    let mm = parseInt(date.substring(5,7))
    let month = months[mm-1]
    return `${parseInt(date.substring(8,date.length))} ${month} ${date.substring(0,4)}` 
  }

  return (
    <Component className="card is-deal is-rounded" {...rest}>
      <div className="card-content">
        <div className="columns is-mobile is-1 is-variable">
          <div className="column is-one-third">
            <figure className="image is-4by3">
              <Image
                className="is-soft-rounded is-outlined"
                src={thumbnail.slice(-3,) === 'jpg' ? thumbnail : placeHolderImage}
                alt={title}
              />
            </figure>
          </div>
          <div className="column">
            <h6 className="title is-size-6 is-marginless">{title}</h6>

            <p className="has-text-grey-dark is-size-7">{releaseDate ? dateConverter(releaseDate): 'Not Yet Available'}</p>
            <p className="has-text-grey-dark is-size-7">Rating: {voteAvg === 0 ? 'Not Yet Available': `${voteAvg} / 10`}</p>
          </div>
        </div>
      </div>
    </Component>
  );
};

createRelativeComponent(MovieCard, 'Placeholder', () => (
  <div className="card is-deal is-rounded has-placeholder">
    <div className="card-content is-excluded">
      <div className="columns is-mobile is-1 is-variable is-excluded">
        <div className="column is-one-third is-excluded">
          <figure className="image is-4by3">
            <Image className="is-outlined is-soft-rounded" />
          </figure>
        </div>
        <div className="column is-excluded">
          <div className="placeholder is-line is-four-fifths" />
          <div className="placeholder is-line is-one-fifth" />
          <div className="placeholder is-line is-two-fifths" />
          <div className="placeholder is-line is-three-fifths" />
        </div>
      </div>
    </div>
  </div>
));

export default MovieCard;
