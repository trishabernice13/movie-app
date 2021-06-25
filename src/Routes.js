import React from 'react';
import { Router } from '@reach/router';

import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import SearchBar from './components/SearchBar';
import LoadingIndicator from './components/LoadingIndicator';
import FeaturedCollectionList from './components/FeaturedCollectionList';

const HomeView = React.lazy(() => import('./views/HomeView'));
const MovieView = React.lazy(() => import('./views/MovieView'));
const MovieSearchView = React.lazy(() => import('./views/MovieSearchView'));
const CategoryView = React.lazy(() => import('./views/CategoryView'));
const SectionView = React.lazy(() => import('./views/SectionView'));
const CollectionView = React.lazy(() => import('./views/CollectionView'));

export default function Routes() {
    return (
        <React.Suspense fallback={<LoadingIndicator />}>
        <Router id="fave-header">
            <SearchBar path="/"/>
            <SearchBar path="/collections" withBackLink/>
            <SearchBar path="/collections/:type" withBackLink/>
            <SearchBar path="/categories/:type" withBackLink/>
            <SearchBar path="/latests/:type" withBackLink/>
            <TopBar
                path="/movies/:id"
                isFaded
                left={props => <TopBar.BackLink isOnFaded {...props} />}
        />
        </Router>
        <Router id="fave-body">
            <HomeView path="/"/>
            <CollectionView path="/collections/:type" />
            <CategoryView path="/categories/:type" />
            <SectionView path="/latests/:type" />
            <FeaturedCollectionList path="/collections"/>
            <MovieView path="/movies/:id" />
            <MovieSearchView path="/movies" />
        </Router>
        <Router id="fave-footer">
            <BottomBar path="/" />
            <BottomBar path="/collections" />
            <BottomBar path="/collections/:type" />
            <BottomBar path="/categories/:type" />
            <BottomBar path="/latests/:type" />
        </Router>
        </React.Suspense>

    )}