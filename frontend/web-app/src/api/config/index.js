import { baseUrl } from "../../config/url-config";
import axios from "axios";

class ApiSender {
  static handleResponse(res) {
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw new Error(res.statusText);
    }
  }

  static handleError(error) {
    if (error.response) {
      console.error("Response error:", error.response.data);
      throw new Error(error.response.data.message || error.response.statusText);
    } else if (error.request) {
      console.error("Request error:", error.request);
      throw new Error("No response received from server");
    } else {
      console.error("General error:", error.message);
      throw new Error(error.message);
    }
  }

  static getApiUrl(url) {
    return baseUrl + url;
  }

  get(url, params = {}) {
    const apiUrl = ApiSender.getApiUrl(url);
    return axios
      .get(apiUrl, { params })
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }

  post(url, data = {}) {
    const apiUrl = ApiSender.getApiUrl(url);
    return axios
      .post(apiUrl, data)
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }

  put(url, data = {}) {
    const apiUrl = ApiSender.getApiUrl(url);
    return axios
      .put(apiUrl, data)
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }

  delete(url, config = {}) {
    const apiUrl = ApiSender.getApiUrl(url);
    return axios
      .delete(apiUrl, config)
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }
}

export default new ApiSender();
