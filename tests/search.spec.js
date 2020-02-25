import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
chai.use(chaiAsPromised);
global.fetch = require("node-fetch");
import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists
} from "../src/index";

describe("Spotify Wrapper", () => {
  let fetchedStub;
  let promise;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, "fetch");
    promise = fetchedStub.resolves({ json: () => ({ body: "json" }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });
  describe("smoke tests", () => {
    it("should exist search method", () => {
      expect(search).to.exist;
    });

    it("should exist searchAlbums method", () => {
      expect(searchAlbums).to.exist;
    });

    it("should exist searchArtists method", () => {
      expect(searchArtists).to.exist;
    });

    it("should exist searchTracks method", () => {
      expect(searchTracks).to.exist;
    });

    it("should exist searchPlaylists method", () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe("Generic Search", () => {
    it("should call fetch function", () => {
      const artists = search();
      expect(fetchedStub).to.have.calledOnce;
      fetchedStub.restore();
    });

    it("should called with the correct URL", () => {
      context("passing one type", () => {
        const artists = search("incubus", "artist");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=incubus&type=artist"
        );

        const album = search("incubus", "album");
        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=incubus&type=album"
        );
      });

      context("passing two types", () => {
        const albums = search("incubus", ["artist", "album"]);

        expect(fetchedStub).to.have.been.calledWith(
          "https://api.spotify.com/v1/search?q=incubus&type=artist,album"
        );
      });
    });

    it("should return a Json data from Promise", () => {
      const artists = search("incubus", "artist");

      return expect(artists).to.eventually.eql({ body: "json" });
    });
  });

  describe("Search Artists", () => {
    it("should call fetch function", () => {
      const artist = searchArtists("Incubus");
      expect(fetchedStub).to.have.be.calledOnce;
    });

    it("should return the correct URL", () => {
      const artists = searchArtists("incubus");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=incubus&type=artist"
      );

      const artist2 = searchArtists("Tiesto");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=incubus&type=artist"
      );
    });
  });

  describe("Search Albums", () => {
    it("should call fetch function", () => {
      const albums = searchAlbums("incubus");
      expect(fetchedStub).to.have.be.calledOnce;
    });

    it("should return the correct URL", () => {
      const artists = searchAlbums("incubus");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=incubus&type=albums"
      );

      const artists2 = searchAlbums("tiesto");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=tiesto&type=albums"
      );
    });
  });

  describe("Search Track", () => {
    it("should call fetch function", () => {
      const track = searchAlbums("incubus");
      expect(fetchedStub).to.have.be.calledOnce;
    });

    it("should return the correct URL", () => {
      const artists = searchTracks("incubus");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=incubus&type=track"
      );

      const artists2 = searchTracks("tiesto");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=tiesto&type=track"
      );
    });
  });

  describe("Search Playlist", () => {
    it("should call fetch function", () => {
      const playlist = searchAlbums("incubus");
      expect(fetchedStub).to.have.be.calledOnce;
    });

    it("should return the correct URL", () => {
      const playlists = searchPlaylists("incubus");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=incubus&type=playlists"
      );

      const playlists2 = searchPlaylists("tiesto");
      expect(fetchedStub).to.have.been.calledWith(
        "https://api.spotify.com/v1/search?q=tiesto&type=playlists"
      );
    });
  });
});
