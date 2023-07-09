'use strict';

var axios = require('axios');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var axios__default = /*#__PURE__*/_interopDefault(axios);

class mediumApi {
  constructor() {
    this.token = "";
  }
  async accountInfo() {
    try {
      const response = await axios__default.default.get("https://api.medium.com/v1/me", { headers: { Authorization: `Bearer ${this.token}` } });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  async getPublications(userId) {
    try {
      const response = await axios__default.default.get(`https://api.medium.com/v1/users/${userId}/publications`, { headers: { Authorization: `Bearer ${this.token}` } });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  async getPublicationsContributors(publicationId) {
    try {
      const response = await axios__default.default.get(`https://api.medium.com/v1/publications/${publicationId}/contributors`, { headers: { Authorization: `Bearer ${this.token}` } });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
}
var api_default = new mediumApi();

module.exports = api_default;
