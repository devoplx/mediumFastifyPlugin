import * as cheerio from 'cheerio';
import { readingTimeRegex } from '../helpers/regex';
import { request } from '../helpers/request';

class mediumApi {
  constructor() {
    this.token = "";
  }
  async accountInfo() {
    try {
      const response = await request("/v1/me", "GET", {
        Authorization: `Bearer ${this.token}`
      });
      if (response instanceof Error)
        throw response;
      const data = {
        id: response.data.id,
        url: response.data.url,
        username: response.data.username,
        imageUrl: response.data.imageUrl,
        name: response.data.name
      };
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async getPublications(userId) {
    try {
      const response = await request(`/v1/users/${userId}/publications`, "GET", {
        Authorization: `Bearer ${this.token}`
      });
      if (response instanceof Error)
        throw response;
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async getPublicationsContributors(publicationId) {
    try {
      const response = await request(
        `/v1/publications/${publicationId}/contributors`,
        "GET",
        { Authorization: `Bearer ${this.token}` }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async getPostData(postLink) {
    try {
      const response = await request(postLink);
      if (response instanceof Error)
        throw response;
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
      let time = "0 min read";
      if ($('meta[name="twitter:data1"]').attr("content") !== void 0) {
        time = $('meta[name="twitter:data1"]').attr("content");
      }
      const readingTimeNumber = readingTimeRegex(time);
      const data = {
        publishedTimeUnfomatted: $('meta[property="article:published_time"]').attr(
          "content"
        ) || "",
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
