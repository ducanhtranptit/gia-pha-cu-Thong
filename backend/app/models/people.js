'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  People.init({
    name: DataTypes.STRING,
    yearBorn: DataTypes.NUMBER,
    gendle: DataTypes.STRING,
    spouseId: DataTypes.NUMBER,
    fatherId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'People',
  });
  return People;
};