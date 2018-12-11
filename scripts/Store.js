/* global $ */

'use strict';

const store = (function() {
  const videos = [];
  const nextPage = undefined;
  const lastSearchTerm = undefined;

  const setVideos = function(videos) {
    this.videos = videos;
  };

  return {
    videos,
    nextPage,
    lastSearchTerm,
    setVideos
  };
}());