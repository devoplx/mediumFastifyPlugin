import axios from 'axios';
import * as cheerio from 'cheerio';
import { readingTimeRegex } from '../helpers/regex';

class mediumApi {
  constructor() {
    this.token = "";
  }
  async accountInfo() {
    try {
      const response = await axios.get("https://api.medium.com/v1/me", { headers: { Authorization: `Bearer ${this.token}` } });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  async getPublications(userId) {
    try {
      const response = await axios.get(`https://api.medium.com/v1/users/${userId}/publications`, { headers: { Authorization: `Bearer ${this.token}` } });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  async getPublicationsContributors(publicationId) {
    try {
      const response = await axios.get(`https://api.medium.com/v1/publications/${publicationId}/contributors`, { headers: { Authorization: `Bearer ${this.token}` } });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
  async getPostData(postLink) {
    try {
      const response = await axios.get(postLink);
      const html = response.data;
      const $ = cheerio.load(html);
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
      const readingTimeNumber = readingTimeRegex(time);
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

export { api_default as default };
