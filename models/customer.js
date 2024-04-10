'use strict';
const { Model } = require('sequelize');
const User = require('./user')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsTo(models.User, { foreignKey: 'user_id' })
      Customer.belongsToMany(models.Course, { through: CourseCustomer })
    }
  }
  Customer.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    cfr: {
      type: DataTypes.STRING,
      unique: true
    },
    email: DataTypes.STRING,
    cover_image: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
    city_of_birth: DataTypes.STRING,
    task: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};