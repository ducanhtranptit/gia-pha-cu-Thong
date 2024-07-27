const model = require("../models/index");
const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jwt");
const config = require("../../config/config");
const User = model.User;
const BlacklistToken = model.BlacklistToken;

class AuthActions {
  async handleLogin(email, password) {
    // Check user existed
    const user = await this.checkExist(email);
    if (!user) {
      return false;
    }
    // Check password
    const isMatchPassword = this.verifyPassword(password, user.password);
    // Type = 1: ADMIN
    if (!isMatchPassword && user.type === 1) {
      return false;
    }
    const tokens = this.signToken({ id: user.id });
    if (!tokens) {
      return false;
    }
    await User.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: user.id } }
    );
    return { id: user.id, ...tokens };
  }

  async handleLogout(accessToken, expiresIn, userId) {
    return await BlacklistToken.create({
      token: accessToken,
      userId,
      expiresIn,
    });
  }

  checkExist(email) {
    const user = User.findOne({ where: { email } });
    return user;
  }
  verifyPassword(password, passwordHash) {
    return bcrypt.comparePassword(password, passwordHash);
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

module.exports = new AuthActions();
