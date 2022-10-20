'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cars.hasMany(models.operations, { foreignKey: "idcar" });
    }
  }
  cars.init({
    name: DataTypes.STRING,
    plate: DataTypes.STRING,
    price: DataTypes.STRING,
    capacity: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    paranoid: true,
    deletedAt: "deletedAt",
    modelName: 'cars',
  });
  return cars;
};