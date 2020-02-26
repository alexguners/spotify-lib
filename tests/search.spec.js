import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import { API_URL } from "../src/config";
import SpotifyWrapper from "../src/index";

chai.use(sinonChai);
chai.use(chaiAsPromised);
global.fetch = require("node-fetch");

describe("Spotify Wrapper", () => {
  let fetchedStub;
  let promise;
  let spotify;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, "fetch");
    promise = fetchedStub.resolves({ json: () => ({ body: "json" }) });
    spotify = new SpotifyWrapper({ apiURL: API_URL, token: "xxx" });
  });

  afterEach(() => {
    fetchedStub.restore();
  });
  describe("smoke tests", () => {
    it("should exist searchAlbums method", () => {
      expect(spotify.search.searchAlbums).to.exist;
    });

    it("should exist searchArtists method", () => {
      expect(spotify.search.searchArtists).to.exist;
    });

    it("should exist searchTracks method", () => {
      expect(spotify.search.searchTracks).to.exist;
    });

    it("should exist searchPlaylists method", () => {
      expect(spotify.search.searchPlaylists).to.exist;
    });
  });

  describe("Search Artists", () => {
    it("should call fetch function", () => {
      const artist = spotify.search.searchArtists("Incubus");
      expect(fetchedStub).to.have.be.calledOnce;
    });

    it("should return the correct URL", () => {
      const artists = spotify.search.searchArtists("incubus");
      const headers = {
        headers: {
          Authorization: `'Bearer xxx'`
        }
      };

      expect(fetchedStub).to.have.be.calledWith(
        `${API_URL}search?q=incubus&type=artists`
      );

      const artist2 = spotify.search.searchArtists("Tiesto");
      expect(fetchedStub).to.have.be.calledWith(
        `${API_URL}search?q=Tiesto&type=artists`
      );
    });
  });

  describe("Search Albums", () => {
    it("should call fetch function", () => {
      const albums = spotify.search.searchAlbums("incubus");

      expect(fetchedStub).to.have.be.calledOnce;
    });

    it("should return the correct URL", () => {
      const artists = spotify.search.searchAlbums("incubus");
      expect(fetchedStub).to.have.be.calledWith(
        `${API_URL}search?q=incubus&type=albums`
      );

      const artists2 = spotify.search.searchAlbums("tiesto");
      expect(fetchedStub).to.have.be.calledWith(
        `${API_URL}search?q=tiesto&type=albums`
      );
    });
  });

  describe("Search Track", () => {
    it("should call fetch function", () => {
      const track = spotify.search.searchAlbums("incubus");
      expect(fetchedStub).to.have.be.calledOnce;
    });

    it("should return the correct URL", () => {
      const artists = spotify.search.searchTracks("incubus");
      expect(fetchedStub).to.have.calledWith(
        `${API_URL}search?q=incubus&type=track`
      );

      const artists2 = spotify.search.searchTracks("tiesto");
      expect(fetchedStub).to.have.calledWith(
        `${API_URL}search?q=tiesto&type=track`
      );
    });
  });

  describe("Search Playlist", () => {
    it("should call fetch function", () => {
      const playlist = spotify.search.searchAlbums("incubus");
      expect(fetchedStub).to.have.be.calledOnce;
    });

    it("should return the correct URL", () => {
      const playlists = spotify.search.searchPlaylists("incubus");
      expect(fetchedStub).to.have.calledWith(
        `${API_URL}search?q=incubus&type=playlists`
      );

      const playlists2 = spotify.search.searchPlaylists("tiesto");
      expect(fetchedStub).to.have.calledWith(
        `${API_URL}search?q=tiesto&type=playlists`
      );
    });
  });
});
