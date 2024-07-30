import ApiSender from "./config/index";

class AuthAPI {
  login(body) {
    const url = "/auth/login";
    return ApiSender.post(url, body);
  }
  async logout() {
    const url = "/auth/logout";
    return await ApiSender.post(url);
  }
}

export default new AuthAPI();
