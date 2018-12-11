/* global $, store, fetchVideos */

'use strict';

const generateListItem = function(video) {
  return `
      <li>
        <img src="${video.thumbnail}" alt="">
        <label for="title">${video.title}</label>
        <label for="id">${video.id}</label>
      </li>
    `;
};

const render = function() {
  let html = store.videos.map(video => generateListItem(video));
  $('.results').html(html);
};

const handleFormSubmit = function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const inputBox = $(this).closest('form').find('input[id=’search-term’]');
    const searchTerm = inputBox.val();
    fetchVideos(searchTerm, function(res) {
      addVideosToStore(decorateResponse(res));
      render();
      $('#search-term').val('');
    });
  });
};