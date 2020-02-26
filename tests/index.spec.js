import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import sinonChai from "sinon-chai";
chai.use(sinonChai);
chai.use(chaiAsPromised);
global.fetch = require("node-fetch");
import SpotifyWrapper from "../src/index";

describe("Spotify Wrapper", () => {
  it("should create an instance of Spotify Wrapper", () => {
    const spotifyInstance = new SpotifyWrapper({});
    expect(spotifyInstance).to.be.an.instanceOf(SpotifyWrapper);
  });

  it("should exist a option with apiURL", () => {
    const spotifyInstance = new SpotifyWrapper({ apiURL: "blablabla" });
    expect(spotifyInstance.apiURL).to.be.equal("blablabla");
  });

  it("should use the default URL if not provided", () => {
    const apiURL = "https://api.spotify.com/v1/";
    const spotifyInstance = new SpotifyWrapper({});
    expect(spotifyInstance.apiURL).to.be.equal(apiURL);
  });

  it("should recive the token", () => {
    const spotifyInstance = new SpotifyWrapper({ token: "blablabla" });
    expect(spotifyInstance.token).to.be.equal("blablabla");

    const spotifyInstance2 = new SpotifyWrapper({});
    expect(spotifyInstance2.token).to.be.equal("");
  });
});

describe("Request method", () => {
  let fetchedStub;
  let promise;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, "fetch");
    promise = fetchedStub.resolves({ json: () => ({ body: "json" }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });
  it("should exist request method", () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.request).to.exist;
  });

  it("should call fetch method", () => {
    const spotify = new SpotifyWrapper({});
    spotify.request("blabla");
    expect(fetchedStub).to.have.calledOnce;
  });

  it("should call fetch method with the correct URL", () => {
    const spotify = new SpotifyWrapper({});
    spotify.request("url");
    expect(fetchedStub).to.have.calledWith("url");
  });

  it("should call fetch method with the correct URL and HEADER", () => {
    const spotify = new SpotifyWrapper({ token: "xxx" });
    const headers = {
      headers: {
        Authorization: `'Bearer xxx'`
      }
    };
    spotify.request("url");
    expect(fetchedStub).to.have.calledWith("url", headers);
  });
});
