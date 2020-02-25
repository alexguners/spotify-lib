"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchTracks = exports.searchAlbums = exports.searchArtists = exports.search = void 0;

var _utils = require("./utils");

var _config = require("./config");

var search = function search(query, type) {
  return fetch("".concat(_config.API_URL, "search?q=").concat(query, "&type=").concat(type), _config.HEADER).then(_utils.toJson);
};

exports.search = search;

var searchArtists = function searchArtists(query) {
  search(query, "artist");
};

exports.searchArtists = searchArtists;

var searchAlbums = function searchAlbums(query) {
  search(query, "albums");
};

exports.searchAlbums = searchAlbums;

var searchTracks = function searchTracks(query) {
  search(query, "track");
};

exports.searchTracks = searchTracks;

var searchPlaylists = function searchPlaylists(query) {
  search(query, "playlists");
};

exports.searchPlaylists = searchPlaylists;