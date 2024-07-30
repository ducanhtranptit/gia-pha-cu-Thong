import http from "./http";

class ApiSender {
  static handleResponse(res) {
    if (res?.status >= 200 && res?.status < 300) {
      return res?.data;
    } else {
      throw new Error(res.statusText);
    }
  }

  static async handleError(error) {
    console.error(error);
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

  async get(url, params = {}) {
    return await http
      .get(url, { params })
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }

  async post(url, formData = {}) {
    return await http
      .post(url, formData)
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }

  async put(url, data = {}) {
    return await http
      .put(url, data)
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }

  async delete(url, config = {}) {
    return await http
      .delete(url, { ...config })
      .then(ApiSender.handleResponse)
      .catch(ApiSender.handleError);
  }
}

export default new ApiSender();
