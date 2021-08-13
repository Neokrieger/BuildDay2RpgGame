'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Save extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Login = this.belongsTo(models.Login)
    }
  };
  Save.init({
    name: DataTypes.STRING,
    lvl: DataTypes.INTEGER,
    xp: DataTypes.INTEGER,
    positionX: DataTypes.INTEGER,
    positionY: DataTypes.INTEGER,
    atk: DataTypes.INTEGER,
    hp: DataTypes.INTEGER,
    gold: DataTypes.INTEGER,
    LoginId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Save',
  });
  return Save;
};
