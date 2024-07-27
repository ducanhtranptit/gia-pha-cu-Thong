import { ACCESSTOKEN_KEY } from "../../config";
import { baseUrl } from "../../config/url-config";
import { getCookie } from "../../utils/cookie";
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
      return error.response.data;
      // throw new Error(error.response.data.message || error.response.statusText);
    } else if (error.request) {
      // console.error("Request error:", error.request);
      return error.request;
      // throw new Error("No response received from server");
    } else {
      // console.error("General error:", error.message);
      return error.message;
      // throw new Error(error.message);
    }
  }

  static getApiUrl(url) {
    return baseUrl + url;
  }

  static getHeader() {
    const headers = {};
    const accessToken = getCookie(ACCESSTOKEN_KEY);
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return headers;
  }

  get(url, params = {}) {
    const apiUrl = ApiSender.getApiUrl(url);
    const headers = ApiSender.getHeader();
    return axios
      .get(apiUrl, { params, headers })
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }

  post(url, formData = {}) {
    const apiUrl = ApiSender.getApiUrl(url);
    const headers = ApiSender.getHeader();
    return axios
      .post(apiUrl, formData, { headers })
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }

  put(url, data = {}) {
    const apiUrl = ApiSender.getApiUrl(url);
    const headers = ApiSender.getHeader();
    return axios
      .put(apiUrl, data, { headers })
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }

  delete(url, config = {}) {
    const apiUrl = ApiSender.getApiUrl(url);
    const headers = ApiSender.getHeader();
    return axios
      .delete(apiUrl, { ...config, headers })
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }
}

export default new ApiSender();
