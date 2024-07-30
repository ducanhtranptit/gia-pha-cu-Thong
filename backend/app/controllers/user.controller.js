const userActions = require("../actions/user.action");
const {
  SuccessResponse,
  ErrorResponse,
  UnauthorizedResponse,
  BadRequestResponse,
} = require("../core/ApiResponse.js");

class UserController {
  async getProfile(req, res) {
    try {
      const userId = req?.data.id;
      if (!userId) {
        return new UnauthorizedResponse().send(req, res);
      }
      const data = await userActions.getProfile(userId);
      if (!data) {
        return new UnauthorizedResponse().send(req, res);
      }
      return new SuccessResponse().send(req, res, data);
    } catch (err) {
      console.error(err);
      return new ErrorResponse().send(req, res);
    }
  }
  async refreshToken(req, res) {
    try {
      const refreshToken = req.body?.refreshToken;
      if (!refreshToken) {
        return new BadRequestResponse().send(req, res);
      }
      const newToken = await userActions.refreshToken(refreshToken);
      if (!newToken) {
        return new BadRequestResponse().send(req, res);
      }
      return new SuccessResponse().send(req, res, newToken);
    } catch (err) {
      console.error(err);
      return new ErrorResponse().send(req, res);
    }
  }
}

module.exports = new UserController();
