import React from 'react';
import BannerCarousel from '../components/BannerCarousel';
import { Link } from '@reach/router';

import CategoryPicker from '../components/CategoryPicker';
import FeaturedCollectionList from '../components/FeaturedCollectionList';
import ScrollUp from '../components/ScrollUp';
import Thematic from '../components/Thematic';

const HomeView = props => {
  return  (
    <ScrollUp>
        <CategoryPicker />
        <div style={{ padding: '0.5rem', background: '#f1f2f3' }} />
        <BannerCarousel/>
        <div style={{ padding: '0.5rem', background: '#f1f2f3'}} />
        <FeaturedCollectionList/>
        <Link
            to={`/collections`}
            className="button is-link is-outlined is-borderless is-fullwidth"
          >
            <span>VIEW MORE</span>
            <span className="icon">
              <i className="material-icons">arrow_forward</i>
            </span>
          </Link>
        <div style={{ padding: '0.5rem', background: '#f1f2f3'}} />
        <Thematic/>
    </ScrollUp>
  );
};

export default HomeView;
