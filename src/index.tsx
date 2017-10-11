import 'core-js/es6/map';
import 'core-js/es6/set';

import * as React from 'react';
import { render } from 'react-dom';

import 'normalize.css';

import App from './App';
import { loadWebFonts } from './utils';

loadWebFonts();

render(<App />, document.getElementById('root'));
