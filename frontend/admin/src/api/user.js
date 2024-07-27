import ApiSender from "./config/index";

class UserAPI {
  getProfile() {
    const url = "/users/profile";
    return ApiSender.get(url);
  }
}

export default new UserAPI();
