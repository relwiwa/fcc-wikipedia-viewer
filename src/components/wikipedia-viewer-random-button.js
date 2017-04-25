import React from 'react';

const WikipediaViewerRandomButton = (props) => {
  return (
    <div className="wv-random-article column small-12 text-center">
      <a
        href="https://en.wikipedia.org/wiki/Special:Random"
        title="Explore Wikipedia by proceeding to a random article"
        className="button primary"
        target="new"
      >Random Article</a>
    </div>
  );
}

export default WikipediaViewerRandomButton;
