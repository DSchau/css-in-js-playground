import * as React from 'react';
import { render } from 'react-dom';

import 'normalize.css';

import App from './App';
import webFontLoader from './utils/web-fonts';

webFontLoader();

render(<App />, document.getElementById('root'));
