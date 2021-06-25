import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import WebFont from 'webfontloader';

import './assets/css/index.scss';
import { QueryString } from './contexts/QueryString';
import dotenv from "dotenv";

require('dotenv').config()


WebFont.load({ google: { families: ['Material Icons', 'Rubik:400,500'] } });

ReactDOM.render(
  <React.StrictMode>
    <QueryString>
      <Routes />
    </QueryString>
  </React.StrictMode>,
  document.getElementById('root')
);