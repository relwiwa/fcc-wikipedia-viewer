import React from 'react';
import { render } from 'react-dom';

import './global-styles.scss';

import WikipediaViewer from './components/wikipedia-viewer';

render(
  <WikipediaViewer />,
  document.getElementById('root')
);
