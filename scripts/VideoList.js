/* global $, store, api */

'use strict';

const videoList = function() {

  // HTML list item template for each video
  const generateListItem = function(video) {
    return `
      <li class="thumbnail">
        <a href="${video.videoUrl}"><img src="${video.thumbnail}" alt="${video.videoId}"></a>
        <h3>${video.title}</h3>
      </li>
    `;
  };

  // HTML template for the 'Show more' button
  const generateShowMorebutton = function() {
    return `
      <button class="js-show-more">Show more</button>
    `;
  };

  // Render function for the search results
  const render = function() {
    let html = store.videos.map(video => generateListItem(video));
    $('.results').html(html);
    if (store.nextPage !== undefined) {
      $('.js-show-more').html(generateShowMorebutton());
    }
  };

  // Form submission handler to fetch videos and re-render the HTML
  const handleFormSubmit = function() {
    $('form').on('submit', function(e) {
      e.preventDefault();
      const inputBox = $('input:first');
      const searchTerm = inputBox.val();
      console.log(inputBox);
      api.fetchVideos(searchTerm, function(res) {
        //   addVideosToStore(decorateResponse(res));
        store.videos = api.decorateResponse(res);
        render();
        $('#search-term').val('');
        store.lastSearchTerm = searchTerm;
      });
    });
  };

  // Show more button handler to fetch more videos and re-render HTML
  const handleShowMoreButton = function() {
    $('div').on('click', '.js-show-more', function(e) {
      e.preventDefault();
      api.fetchVideos(store.lastSearchTerm, function(res) {
        let newVideos = api.decorateResponse(res);
        newVideos.map(video => store.videos.push(video));
        store.nextPage = undefined;
        render();
      });
      console.log('js show more button working');
    });
  };

  function bindEventListeners() {
    handleFormSubmit();
    handleShowMoreButton();
  }

  return {
    render,
    bindEventListeners
  };
}();