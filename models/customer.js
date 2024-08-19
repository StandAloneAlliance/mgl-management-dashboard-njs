'use strict';
const { Model } = require('sequelize');
const { User, Course, Guest } = require('../models/index')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsTo(models.User, { foreignKey: 'user_id' })
      Customer.belongsToMany(models.Course, {
        through: 'course_customer',
        foreignKey: 'customer_id', // Nome del campo chiave esterna nella tabella pivot che fa riferimento a Customer
        otherKey: 'course_id', // Nome del campo chiave esterna nella tabella pivot che fa riferimento a Course
      });
    };

  }

  Customer.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT,
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
    tableName: 'customers'
  });
  return Customer;
}

