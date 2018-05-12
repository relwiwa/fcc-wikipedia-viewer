import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import React from 'react';

const WikipediaViewerRandomButton = (props) => {
  return (
    <div className="wv-random-article text-center">
      <a
        href="https://en.wikipedia.org/wiki/Special:Random"
        title="Explore Wikipedia by proceeding to a random article"
        className="button primary"
      ><FontAwesomeIcon icon="random" /> Random Article on Wikipedia</a>
    </div>
  );
}

export default WikipediaViewerRandomButton;
