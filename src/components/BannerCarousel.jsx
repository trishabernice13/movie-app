import React from 'react';
import Observer from '@researchgate/react-intersection-observer';
import Image from '../components/Image';
import createRelativeComponent from '../helpers/createRelativeComponent';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import getMovies from '../queries/getMovies'
import placeHolderImage from '../assets/images/placeholderImage.png';

class BannerCarousel extends React.PureComponent {
  state = {
    isLoading: true  
  };

  handleIntersection = event => {
    if (event.isIntersecting) {

      getMovies({head: "discover/movie?", sorting: "&sort_by=release_date.asc", end: "&region=SG&page=1&include_adult=false&include_video=false&release_date.gte=2021-06-01"}).then(response =>
        this.setState({isLoading:false, banners: response.results})
      )
    }
  };

  render() {
    if (this.state.isLoading)
      return (
        <Observer onChange={this.handleIntersection}>
          <BannerCarousel.Placeholder />
        </Observer>
      );

    return (
      <div className="section is-mobile is-white">
        <div className="container">
          <h4
            className="is-size-4 has-text-weight-medium"
            style={{ marginBottom: '1rem' }}
          >
            Showing Now
          </h4>
          <Carousel infiniteLoop={true} autoPlay={true} showThumbs={false} showArrows={false} showStatus={false} showIndicators={false} interval={2000}>
            {
              this.state.banners.map(item => (
               <div key={item.id}>
                  <a href={`/movies/${item.id}`} className="image is-15by7">
                    <img src={item.backdrop_path? `http://image.tmdb.org/t/p/w400/${item.backdrop_path}` : placeHolderImage} alt ="No Backdrop"/>
                  </a>
                  <h1>{item.title}</h1>
               </div>
              ))
            }
         
          </Carousel>
        </div>
      </div>
    );
  }
}

createRelativeComponent(
  BannerCarousel,
  'Placeholder',
  React.forwardRef((props, ref) => (
    <div ref={ref} className="section is-mobile is-white" {...props}>
      <div
        className="placeholder is-line is-one-fifth is-size-4"
        style={{ marginBottom: '1rem' }}
      />
      <div className="container">
        <div
          className="placeholder is-line is-one-fifth is-size-4"
          style={{ marginBottom: '1rem' }}
        />
        <figure className="image is-15by7">
          <Image className="is-outlined is-soft-rounded" />
        </figure>
      </div>
    </div>
  ))
);

export default BannerCarousel;
