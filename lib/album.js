"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = void 0;

var _utils = require("./utils");

var _config = require("./config");

var getAlbum = function getAlbum(id) {
  return fetch("".concat(_config.API_URL, "albums/").concat(id), _config.HEADER).then(_utils.toJson);
};

exports.getAlbum = getAlbum;

var getAlbums = function getAlbums(id) {
  return fetch("".concat(_config.API_URL, "albums?ids=").concat(id), _config.HEADER).then(_utils.toJson);
};

exports.getAlbums = getAlbums;

var getAlbumTracks = function getAlbumTracks(id) {
  return fetch("".concat(_config.API_URL, "albums/").concat(id, "/tracks"), _config.HEADER).then(_utils.toJson);
};

exports.getAlbumTracks = getAlbumTracks;