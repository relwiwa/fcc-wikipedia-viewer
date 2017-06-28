import $ from 'jquery/dist/jquery.slim';

import React, { Component } from 'react';
import { Foundation } from 'foundation-sites/js/foundation.core';
import { MediaQuery } from 'foundation-sites/js/foundation.util.mediaQuery';
import { ImageLoader } from 'foundation-sites/js/foundation.util.imageLoader';
import { Equalizer } from 'foundation-sites/js/foundation.equalizer';

import SPEX from '../config/wikipedia-viewer.config';

class WikipediaViewerOutput extends Component {

  componentDidMount() {
    /* - Add foundation to jQuery if it hasn't been added yet
       - Necessary for $.foundation() function to be available */
    if (!$(document).foundation) {
      Foundation.addToJquery($);
    }
    /*  - Programmatically create new Equalizer on specified element
        - The element now has the foundation() function
        - That function is used to destroy the Equalizer object
          when componentWillUnmount */
    new Equalizer($('#' + SPEX.equalizer.output));
    addEventListener('resize', () => this.reInitEqualizer());
  }

  componentDidUpdate() {
    this.reInitEqualizer();
  }

  componentWillUnmount() {
    removeEventListener('resize', this.reInitEqualizer);
    $('#' + SPEX.equalizer.output).foundation('destroy');
  }

  reInitEqualizer() {
    Foundation.reInit($('#' + SPEX.equalizer.output));
  }

  renderSearchResult(searchResult) {
    return (
      <div
        className="column"
        key={searchResult.headline}>
        <div className="card" data-equalizer-watch={SPEX.equalizer.output}>
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
      <div
        className="wikipedia-viewer-output row medium-up-2 large-up-3"
        data-equalizer={SPEX.equalizer.output}
        data-equalize-by-row="true"
        id={SPEX.equalizer.output}
      >
        {searchResults.map(searchResult => this.renderSearchResult(searchResult))}
      </div>
    );
  }
}

export default WikipediaViewerOutput;
