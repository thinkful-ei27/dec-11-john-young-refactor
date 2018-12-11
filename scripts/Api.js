/* global $ */

'use strict';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search?';
const API_KEY = 'AIzaSyAFBaf7iZdFuLJOgQ224GIWuMQ4Z2dDM2g';

const fetchVideos = function(searchTerm, callback) {
  const data = {
    q: searchTerm,
    part: 'snippet',
    key: API_KEY,
    type: 'video'
  };
  const fetcher = $.getJSON(BASE_URL, data, callback);

  const decorateResponse = function(response) {
    const {items} = response;
    let arr = [];
    for (const obj of items) {
      let videoId = obj.id.videoId;
      let title = obj.snippet.title;
      let thumbnail = obj.snippet.thumbnails.default.url;
      let item = {
        videoId: videoId,
        title: title,
        thumbnail: thumbnail
      };
      arr.push(item);
    }
    return arr;
  };

  return {
    fetcher,
    decorateResponse
  };
};