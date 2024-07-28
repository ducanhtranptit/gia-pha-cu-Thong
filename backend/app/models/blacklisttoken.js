"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BlacklistToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlacklistToken.init(
    {
      token: DataTypes.STRING,
      expiresIn: DataTypes.INTEGER,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "BlacklistToken",
    }
  );
  return BlacklistToken;
};
