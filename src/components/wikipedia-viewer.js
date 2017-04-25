import axios from 'axios';
import es6Promise from 'es6-promise';
import React, { Component } from 'react';

import WikipediaViewerInput from './wikipedia-viewer-input';
import WikipediaViewerOutput from './wikipedia-viewer-output';
import WikipediaViewerRandomButton from './wikipedia-viewer-random-button';

const apiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=15&format=json&origin=*&search=';

es6Promise.polyfill();
const axiosConfig = axios.create({
  timeout: 5000,
  headers: {
    'Api-User-Agent': 'Wikipedia Viewer Project for FreeCodeCamp'
  }
});

class WikipediaViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: null,
    }
  }

  handleUpdateSearchTerm(event) {
    const searchTerm = event.target.value;
    if (searchTerm !== '') {
      this.performApiRequest(searchTerm);
      this.setState({ searchTerm });
    }
    else {
      this.setState({
        searchTerm: searchTerm,
        searchResults: null
      });
    }
  }

  performApiRequest(searchTerm) {
    axios.get(apiUrl + searchTerm, axiosConfig)
    .then(
      (response) => {
        this.updateSearchResults(response.data);
      },
      (error) => {
        this.setState({
          searchResults: null
        });
      }
    );
  }

  /** updateSearchResults
   *  - updates searchResults state property
   *  - filters results to not include:
   *    - results without a description text
   *    - results that are disambiguations
   *    - results whose description text is too short */
  updateSearchResults(response) {
    if (response[0] === this.state.searchTerm) {
      let searchResults = [];
      for (let i = 0; i < response[1].length; i++) {
        if (response[2][i] !== '' && response[1][i].indexOf('disambiguation') < 0 && response[2][i].length > 35) {
          const searchResult = {
            headline: response[1][i],
            teaser: response[2][i],
            link: response[3][i]
          };
          searchResults.push(searchResult);
        }
      }
      this.setState({
        searchResults
      });
    }
  }

  render() {
    const { searchResults, searchTerm } = this.state;

    return (
      <div className="wikipedia-viewer row columns">
        <h1 className="text-center">A Wikipedia Viewer</h1>
        <p className="text-center">Search Wikipedia entries by providing a search term, or explore Wikipedia by proceeding to a random article</p>
        <WikipediaViewerInput
          searchTerm={searchTerm}
          onUpdateSearchTerm={(event) => this.handleUpdateSearchTerm(event)}
        />
        {searchResults !== null && <WikipediaViewerOutput
          searchTerm={searchTerm}
          searchResults={searchResults}
        />}
        {(searchResults !== null && searchResults.length === 0) && <p className="text-center">There are no articles on Wikipedia for this search term</p>}
        <WikipediaViewerRandomButton />
      </div>
    )
  }
}

export default WikipediaViewer;
