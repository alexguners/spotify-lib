import { toJson } from "./utils";
import { API_URL, HEADER } from "./config";

export const search = (query, type) => {
  return fetch(`${API_URL}search?q=${query}&type=${type}`, HEADER).then(toJson);
};
export const searchArtists = query => {
  search(query, "artist");
};
export const searchAlbums = query => {
  search(query, "albums");
};

export const searchTracks = query => {
  search(query, "track");
};
export const searchPlaylists = query => {
  search(query, "playlists");
};
