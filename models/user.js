'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
const { Attribute, PrimaryKey, AutoIncrement, NotNull } = require('sequelize');
const Customer = require('./customer')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Customer, { foreignKey: 'user_id' });
    }
  }
  User.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    });
  return User;
};