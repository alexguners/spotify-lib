import { toJson } from "./utils";
import { API_URL, HEADER } from "./config";

export const getAlbum = id => {
  return fetch(`${API_URL}albums/${id}`, HEADER).then(toJson);
};
export const getAlbums = id => {
  return fetch(`${API_URL}albums?ids=${id}`, HEADER).then(toJson);
};
export const getAlbumTracks = id => {
  return fetch(`${API_URL}albums/${id}/tracks`, HEADER).then(toJson);
};
