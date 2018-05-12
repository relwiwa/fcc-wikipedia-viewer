import React from 'react';

import WikipediaViewerOutputItem from './wikipedia-viewer-output-item';

const WikipediaViewerOutput = ({ searchResults }) => {
  return (
    <div
      className="wikipedia-viewer-output grid-x grid-margin-x grid-margin-y grid-padding-x grid-padding-y medium-up-2 large-up-3"
    >
      {searchResults.map(searchResult => <WikipediaViewerOutputItem key={searchResult.headline} searchResult={searchResult} />)}
    </div>
  );
};

export default WikipediaViewerOutput;
