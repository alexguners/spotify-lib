"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HEADER = exports.API_URL = void 0;
var TOKEN_API = "BQAvnfpiNS3Jw8NA8VT56xtmHmIwyLVd9S1qLu6-zDN-hARckKKcqbsFc8U2BmDM05sjC9uulBKPLNG7mZpnDdtVw4YO13UB6R5TfOEaUbh-NteOruBzJVBRH-whR0aPTTaQvMjsM7AAuqgYRAs";
var API_URL = "https://api.spotify.com/v1/";
exports.API_URL = API_URL;
var HEADER = {
  headers: {
    Authorization: "Bearer ".concat(TOKEN_API)
  }
};
exports.HEADER = HEADER;