import React from 'react';

const WikipediaViewerOutput = (props) => {
  const { searchResults } = props;

  const renderSearchResult = (searchResult) => {
    return (
      <div
        className="column column-block"
        key={searchResult.headline}>
        <div className="card">
          <div className="card-section">
            <h4>{searchResult.headline}</h4>
            <p>{searchResult.teaser}</p>
            <a
              className="button small primary"
              href={searchResult.link}
              title={'Read full article on Wikipedia: ' + searchResult.headline}
            >Read Full Article</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wikipedia-viewer-output">
      <div className="row medium-up-2 large-up-3">
        {searchResults.map(searchResult => renderSearchResult(searchResult))}
      </div>
    </div>
  );
}

export default WikipediaViewerOutput;
