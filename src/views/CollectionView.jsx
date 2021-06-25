import React from 'react';
import MovieList from '../components/MovieList';
import Image from '../components/Image';

export default class CollectionView extends React.PureComponent {
  get searchParams() {
    return {
       type: this.props.type,
       movieBy: "collection",
       limit: 20,
    };
  }

  render() {
    return (
      <>
        <div className="banner">
          <figure className="image is-15by7">
            <Image
              src= {require(`../assets/images/collections/${this.searchParams.type}.png`).default}
              alt= {this.searchParams.type}
            />
          </figure>
        </div>
        <div className="section is-mobile is-white">
          <div className="container">
            <MovieList
              key={JSON.stringify(this.searchParams)}
              params={this.searchParams}
            />
          </div>
        </div>

      </>
    );
  }
}
