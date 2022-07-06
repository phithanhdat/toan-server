'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Score.belongsTo(models.User, {foreignKey: 'user_id'});
      Score.belongsTo(models.Round, {foreignKey: 'round_id'});
    }
  }
  Score.init({
    stars: DataTypes.INTEGER,
    active: DataTypes.INTEGER,
    lock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};