const jwt = require("../utils/jwt");
const config = require("../../config/config");
const model = require("../models/index");
const User = model.User;

class UserActions {
  async getProfile(id) {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      type: user.type,
    };
  }
  async refreshToken(refreshToken) {
    const payload = jwt.verifyToken(refreshToken, config.refreshTokenSecret);
    if (!payload?.decoded) {
      return null;
    }

    const user = await User.findOne({
      where: { id: payload.decoded.id, refreshToken },
    });
    if (!user) {
      return null;
    }

    const newToken = this.signToken({ id: user.id });
    if (!newToken) {
      return null;
    }

    await User.update(
      { refreshToken: newToken.refreshToken },
      { where: { id: user.id } }
    );

    return newToken;
  }

  signToken(payload) {
    const accessToken = jwt.signToken(payload, config.accessTokenSecret, {
      expiresIn: config.accessTokenExpires,
    });
    const refreshToken = jwt.signToken(payload, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenExpires,
    });
    if (!accessToken || !refreshToken) {
      return false;
    }
    return { accessToken, refreshToken };
  }
}

module.exports = new UserActions();
