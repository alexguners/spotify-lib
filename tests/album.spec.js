import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { getAlbum, getAlbumTracks, getAlbums } from "../src/album";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { API_URL } from "../src/config";
chai.use(sinonChai);
chai.use(chaiAsPromised);

global.fetch = require("node-fetch");

describe("Album Tests", () => {
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
    it("should exist getAlbum method", () => {
      expect(getAlbum).to.exist;
    });

    it("should exist getAlbumTracks method", () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe("GetAlbum Tests", () => {
    it("should call fetch method", () => {
      const album = getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should call with the correct URL", () => {
      const album = getAlbum("4aawyAB9vmqN3uQ7FjRGTy");
      expect(fetchedStub).to.have.be.calledWith(
        `${API_URL}albums/4aawyAB9vmqN3uQ7FjRGTy`
      );

      const album2 = getAlbum("4aawyAB9vmqN3uQ7FjRGTk");
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk"
      );
    });

    it("should return a Json data from Promise", () => {
      const album = getAlbum("4aawyAB9vmqN3uQ7FjRGTy");
      return expect(album).to.eventually.eql({ body: "json" });
    });
  });

  describe("GetAlbums Tests", () => {
    it("should call fetch method", () => {
      const album = getAlbums(
        "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo"
      );
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should call with the correct URL", () => {
      const album = getAlbums(
        "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo"
      );
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo"
      );

      const album2 = getAlbums(
        "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyk"
      );
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyk"
      );
    });

    it("should return a Json data from Promise", () => {
      const album = getAlbums(
        "382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyk"
      );
      return expect(album).to.eventually.eql({ body: "json" });
    });
  });

  describe("GetTracks Tests", () => {
    it("should call fetch method", () => {
      const tracks = getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it("should call the correct URL", () => {
      const tracks = getAlbumTracks("4aawyAB9vmqN3uQ7FjRGTy");
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks"
      );

      const tracks2 = getAlbumTracks("4aawyAB9vmqN3uQ7FjRGTk");
      expect(fetchedStub).to.have.be.calledWith(
        "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk/tracks"
      );
    });

    it("should return a Json data from Promise", () => {
      const tracks = getAlbumTracks("4aawyAB9vmqN3uQ7FjRGT");
      return expect(tracks).to.eventually.eql({ body: "json" });
    });
  });
});
