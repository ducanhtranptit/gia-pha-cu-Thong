import ApiSender from "./config/index";

class UserAPI {
  async getProfile() {
    const url = "/users/profile";
    return await ApiSender.get(url);
  }
}

export default new UserAPI();
