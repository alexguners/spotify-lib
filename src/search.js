function searcher(type, query) {
  return this.request(`${this.apiURL}search?q=${query}&type=${type}`);
}

export default function search() {
  return {
    searchArtists: searcher.bind(this, "artists"),
    searchAlbums: searcher.bind(this, "albums"),
    searchTracks: searcher.bind(this, "track"),
    searchPlaylists: searcher.bind(this, "playlists")
  };
}
