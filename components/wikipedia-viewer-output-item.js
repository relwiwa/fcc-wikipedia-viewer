import React from 'react';

import '../styles/wikipedia-viewer-output-item.scss';

const WikipediaViewerOutputItem = ({ searchResult }) => {
  return <div
    className="wikipedia-viewer-output-item cell"
    key={searchResult.headline}
  >
    <h4 className="text-center">{searchResult.headline}</h4>
    <p>{searchResult.teaser}</p>
    <div className="text-center">
      <a
        className="button hollow small primary"
        href={searchResult.link}
        title={'Read full entry on Wikipedia: ' + searchResult.headline}
      >
        Read Full Entry on Wikipedia
      </a>
    </div>
  </div>;
}

export default WikipediaViewerOutputItem;
