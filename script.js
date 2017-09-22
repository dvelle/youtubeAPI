"use strict";

const apiKey = `AIzaSyC3G89xR3b04wA8_akZnWLe3-0Rl7Bm9fc`;

const searchURL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: searchURL,
    data: {
      part: 'snippet',
      key: apiKey,
      q: `${searchTerm}`,
      maxResults: 12
    },
    dataType: 'json',       // no need for this, youtube gets datatype MIME by default if no data is specified, which works.
    type: 'GET',		    //no need to put a type of "GET" since we are running $.ajax(settings) after?
    success: callback
  };
$.ajax(settings);
}

function renderResult(result) {
 // console.log('displayResult', result);
  return `
	  <div class="box box1"><a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
	  </div>
      `;
}

function displayYoutubeSearchResults(data) {
 const searchResults = data.items.map((item, index) => renderResult(item));
 //console.log('displayYoutubeSearchResults', searchResults);
 $('.flex-container').html(searchResults);
}

function watchSubmit() {
  $('.js-search').submit(function(event) {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('#searchInput');
    let query = queryTarget.val();
    //console.log('query', query);
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchResults);
 
  });
}
$(watchSubmit);