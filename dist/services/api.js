'use strict';

var axios = require('axios');
var cheerio = require('cheerio');
var regex = require('../helpers/regex');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var axios__default = /*#__PURE__*/_interopDefault(axios);
var cheerio__namespace = /*#__PURE__*/_interopNamespace(cheerio);

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
  async getPostData(postLink) {
    try {
      const response = await axios__default.default.get(postLink);
      const html = response.data;
      const $ = cheerio__namespace.load(html);
      const metaTags = $("meta");
      let metaInfo = {};
      metaTags.each((_, element) => {
        const name = $(element).attr("name");
        const property = $(element).attr("property");
        const content = $(element).attr("content");
        if (name || property) {
          metaInfo[name || property] = content;
        }
      });
      let time = "";
      if ($('meta[name="twitter:data1"]').attr("content") == void 0) {
        time = "0 min read";
      }
      const readingTimeNumber = regex.readingTimeRegex(time);
      const data = {
        publishedTimeUnfomatted: $('meta[property="article:published_time"]').attr("content") || "",
        title: $('meta[name="title"]').attr("content") || "",
        description: $('meta[name="description"]').attr("content") || "",
        image: $('meta[property="og:image"]').attr("content") || "",
        authorUrl: $('meta[property="article:author"]').attr("content") || "",
        author: $('meta[name="author"]').attr("content") || "",
        dateFormated: $('meta[name="twitter:tile:info2:text"]').attr("content") || "",
        name: $('meta[name="twitter:tile:info1:text"]').attr("content") || "",
        readingTime: $('meta[name="twitter:data1"]').attr("content") || "",
        readingTimeNumber
      };
      return data;
    } catch (error) {
      return error;
    }
  }
}
var api_default = new mediumApi();

module.exports = api_default;
