import React from 'react';
import { render } from 'react-dom';
import WikipediaViewer from './components/wikipedia-viewer';
import styles from './styles/wikipedia-viewer.scss';

render(
  <WikipediaViewer />,
  document.getElementById('root')
);
