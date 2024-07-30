const authActions = require("../actions/auth.action.js");
const {
  SuccessResponse,
  ErrorResponse,
  BadRequestResponse,
} = require("../core/ApiResponse.js");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email?.trim() || !password?.trim()) {
        return new BadRequestResponse().send(req, res);
      }
      const data = await authActions.handleLogin(email, password);
      if (!data) {
        return new BadRequestResponse().send(req, res);
      }
      return new SuccessResponse().send(req, res, data);
    } catch (err) {
      console.error(err);

      return new ErrorResponse().send(req, res);
    }
  }

  async logout(req, res) {
    try {
      const token = req.headers["authorization"];
      const accessToken = token?.split("Bearer ")[1];
      const userId = req?.data.id;
      const expiresIn = req?.data.exp;
      if (!accessToken || !userId) {
        return new BadRequestResponse().send(req, res);
      }
      const data = await authActions.handleLogout(
        accessToken,
        expiresIn,
        userId
      );
      return new SuccessResponse().send(req, res, data);
    } catch (err) {
      console.error(err);
      return new ErrorResponse().send(req, res);
    }
  }
  register(req, res) {
    return new BadRequestResponse().send(req, res);
  }
}

module.exports = new AuthController();
