import React from 'react';

import 'script-loader!jquery/dist/jquery.slim.min';
import 'script-loader!foundation-sites/dist/js/foundation';

class WikipediaViewerOutput extends React.Component {
  componentDidMount() {
    $(document).foundation();
    this.resizeListener = addEventListener('resize', () => {
      Foundation.reInit('equalizer');
    });
  }

  componentDidUpdate() {
    Foundation.reInit('equalizer');
  }

  componentWillUnmount() {
    removeEventListener('resize', this.resizeListener);
  }

  renderSearchResult(searchResult) {
    return (
      <div
        className="column"
        key={searchResult.headline}>
        <div className="card" data-equalizer-watch>
          <div className="card-section">
            <h4 className="text-center">{searchResult.headline}</h4>
            <p>{searchResult.teaser}</p>
            <div className="text-center">
              <a
                className="button small primary"
                href={searchResult.link}
                title={'Read full article on Wikipedia: ' + searchResult.headline}
              >Read Full Article</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { searchResults } = this.props;

    return (
      <div className="wikipedia-viewer-output row medium-up-2 large-up-3" data-equalizer data-equalize-by-row="true">
        {searchResults.map(searchResult => this.renderSearchResult(searchResult))}
      </div>
    );
  }
}

export default WikipediaViewerOutput;
