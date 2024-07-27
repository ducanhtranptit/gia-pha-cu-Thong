const { UnauthorizedResponse } = require("../../core/ApiResponse");
const config = require("../../../config/config");
const jwt = require("../../utils/jwt");
const models = require("../../models");
const BlacklistToken = models.BlacklistToken;

const VerifyTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const accessToken = token?.split("Bearer ")[1];
    if (!token || !accessToken) {
      return new UnauthorizedResponse().send(req, res);
    }
    const tokenIsValid = await BlacklistToken.findOne({
      where: { token: accessToken },
    });
    if (tokenIsValid) {
      return new UnauthorizedResponse().send(req, res);
    }
    const payload = jwt.verifyToken(accessToken, config.accessTokenSecret);
    if (!payload?.decoded) {
      return new UnauthorizedResponse().send(req, res);
    }
    req.data = payload?.decoded;
    next();
  } catch (err) {
    console.error(err);
    return new UnauthorizedResponse().send(req, res);
  }
};

module.exports = VerifyTokenMiddleware;
