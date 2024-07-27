import ApiSender from "./config/index";

class AuthAPI {
  login(body) {
    const url = "/auth/login";
    return ApiSender.post(url, body);
  }
  logout() {
    const url = "/auth/logout";
    return ApiSender.post(url);
  }
}

export default new AuthAPI();
