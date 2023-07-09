import axios from 'axios';

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
}
var api_default = new mediumApi();

export { api_default as default };
