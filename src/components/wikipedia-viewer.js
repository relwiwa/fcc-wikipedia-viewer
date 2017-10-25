import axios from 'axios';
import es6Promise from 'es6-promise';
import React, { Component } from 'react';

import '../styles/wikipedia-viewer.scss';
import SPEX from '../config/wikipedia-viewer.config';

import WikipediaViewerInput from './wikipedia-viewer-input';
import WikipediaViewerOutput from './wikipedia-viewer-output';
import WikipediaViewerRandomButton from './wikipedia-viewer-random-button';

const apiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=' + SPEX.limitSearchItems + '&format=json&origin=*&search=';

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
      status: null,
    }
  }

  handleUpdateSearchTerm(event) {
    const searchTerm = event.target.value;
    if (searchTerm !== '') {
      this.performApiRequest(searchTerm);
      this.setState({
        searchTerm: searchTerm,
        status: SPEX.stati.searching,
      });
    }
    else {
      this.setState({
        searchTerm: searchTerm,
        searchResults: null,
        status: null,
      });
    }
  }

  performApiRequest(searchTerm) {
    axios.get(apiUrl + searchTerm, axiosConfig)
    .then(
      (response) => {
        if (!response.data.error) {
          this.updateSearchResults(response.data);
        }
        else {
          this.setState({
            searchResults: null,
            status: SPEX.stati.error,
          });
        }
      },
      (error) => {
        this.setState({
          searchResults: null,
          status: SPEX.stati.error,
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
    if (response[0].trim() === this.state.searchTerm.trim()) {
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
        searchResults: searchResults,
        status: SPEX.stati.searchDone,
      });
    }
  }

  render() {
    const { searchResults, searchTerm, status } = this.state;
    const { stati } = SPEX;

    return (
      <div className="wikipedia-viewer grid-container grid-container-padded">
        <div className="grid-x grid-margin-y">
          <div className="cell">
            <h1 className="text-center">A Wikipedia Viewer</h1>
            <p className="text-center">Search Wikipedia entries by providing a search term, or explore Wikipedia by proceeding to a random article</p>
            <WikipediaViewerInput
              topOrBottom={'top'}
              searchTerm={searchTerm}
              onUpdateSearchTerm={(event) => this.handleUpdateSearchTerm(event)}
            />
          </div>
          <div className="cell">
            {(status === stati.searching && (searchResults === null || searchResults.length === 0)) && <p className="text-center"><i className="fa fa-spinner fa-3x"></i><br />Performing search for Wikipedia articles</p>}        
            {(status === stati.searchDone && searchResults.length === 0) && <p className="text-center">There are no articles on Wikipedia for this search term</p>}
            {(status === stati.error) && <p className="text-center">An error happened while searching for Wikipedia articles</p>}        
            {searchResults !== null && <WikipediaViewerOutput
              searchTerm={searchTerm}
              searchResults={searchResults}
            />}
          </div>
          <div className="cell">
            {(searchResults !== null && searchResults.length > 3) && <div className="show-for-small-only">
              <WikipediaViewerInput
                topOrBottom={'bottom'}
                searchTerm={searchTerm}
                onUpdateSearchTerm={(event) => this.handleUpdateSearchTerm(event)}
              />
            </div>}
          </div>
          <div className="cell">
            <WikipediaViewerRandomButton />
          </div>
        </div>
      </div>
    );
  }
}

export default WikipediaViewer;
