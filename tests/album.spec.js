import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { getAlbum, getAlbumTracks, getAlbums } from "../src/album";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { API_URL } from "../src/config";
import SpotifyWrapper from "../src/index";

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.fetch = require("node-fetch");

describe("Album Tests", () => {
  let fetchedStub;
  let promise;
  let spotify;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, "fetch");
    promise = fetchedStub.resolves({ json: () => ({ body: "json" }) });
    spotify = new SpotifyWrapper({ token: "xxx" });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe("smoke tests", () => {
    it("should exist getAlbum method", () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it("should exist getAlbumTracks method", () => {
      expect(spotify.album.getTracks).to.exist;
    });

    it("should exist getAlbums method", () => {
      expect(spotify.album.getAlbums).to.exist;
    });
  });

  describe("GetAlbum Tests", () => {
    it("should call fetch method", () => {
      const album = spotify.album.getAlbum("xxx");
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should call with the correct URL", () => {
      const album = spotify.album.getAlbum("4aawyAB9vmqN3uQ7FjRGTy");
      expect(fetchedStub).to.have.be.calledWith(
        `${API_URL}albums/4aawyAB9vmqN3uQ7FjRGTy`
      );

      const album2 = spotify.album.getAlbum("4aawyAB9vmqN3uQ7FjRGTk");
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk"
      );
    });

    it("should return a Json data from Promise", () => {
      const album = spotify.album.getAlbum("4aawyAB9vmqN3uQ7FjRGTy");
      return expect(album).to.eventually.eql({ body: "json" });
    });
  });

  describe("GetAlbums Tests", () => {
    it("should call fetch method", () => {
      const album = spotify.album.getAlbums(
        "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo"
      );
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should call with the correct URL", () => {
      const album = spotify.album.getAlbums(
        "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo"
      );
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo"
      );

      const album2 = spotify.album.getAlbums(
        "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyk"
      );
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyk"
      );
    });

    it("should return a Json data from Promise", () => {
      const album = spotify.album.getAlbums(
        "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyk"
      );
      return expect(album).to.eventually.eql({ body: "json" });
    });
  });

  describe("GetTracks Tests", () => {
    it("should call fetch method", () => {
      const tracks = spotify.album.getTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should call the correct URL", () => {
      const tracks = spotify.album.getTracks("4aawyAB9vmqN3uQ7FjRGTy");
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks"
      );

      const tracks2 = spotify.album.getTracks("4aawyAB9vmqN3uQ7FjRGTk");
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk/tracks"
      );
    });

    it("should return a Json data from Promise", () => {
      const tracks = spotify.album.getTracks("4aawyAB9vmqN3uQ7FjRGT");
      return expect(tracks).to.eventually.eql({ body: "json" });
    });
  });
});
