"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = search;

function searcher(type, query) {
  return this.request("".concat(this.apiURL, "search?q=").concat(query, "&type=").concat(type));
}

function search() {
  return {
    searchArtists: searcher.bind(this, "artists"),
    searchAlbums: searcher.bind(this, "albums"),
    searchTracks: searcher.bind(this, "track"),
    searchPlaylists: searcher.bind(this, "playlists")
  };
}