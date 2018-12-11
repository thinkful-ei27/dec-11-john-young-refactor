/* global $, store */

'use strict';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search?';
const API_KEY = 'AIzaSyAFBaf7iZdFuLJOgQ224GIWuMQ4Z2dDM2g';

const api = (function() {
  const createYoutubeLink = function(id) {
    let link = `https://www.youtube.com/watch?v=${id}`;
    return link;
  };

  const fetchVideos = function(searchTerm, callback) {
    const data = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      type: 'video'
    };
    if (store.nextPage !== undefined) {
      data.pageToken = store.nextPage;
    }
    $.getJSON(BASE_URL, data, callback);
  };
  
  const decorateResponse = function(response) {
    const {items} = response;
    let {nextPageToken} = response;
    store.nextPage = nextPageToken;
    let arr = [];
    for (const obj of items) {
      let videoId = obj.id.videoId;
      let title = obj.snippet.title;
      let thumbnail = obj.snippet.thumbnails.default.url;
      let videoUrl = createYoutubeLink(videoId);
      let item = {
        videoId: videoId,
        title: title,
        thumbnail: thumbnail,
        videoUrl: videoUrl
      };
      arr.push(item);
    }
    return arr;
  };

  return {
    fetchVideos,
    decorateResponse
  };
}());