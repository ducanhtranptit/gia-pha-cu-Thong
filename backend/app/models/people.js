"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    static associate(models) {}
  }
  People.init(
    {
      name: DataTypes.STRING,
      born: DataTypes.DATE,
      gender: DataTypes.STRING,
      spouseId: DataTypes.INTEGER,
      fatherId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      note: DataTypes.STRING,
      filePath: DataTypes.STRING,
      dateOfDeath: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "People",
    }
  );
  return People;
};
