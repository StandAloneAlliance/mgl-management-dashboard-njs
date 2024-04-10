const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db-connection'); // Assicurati che il percorso sia corretto
const User = require('../models/User')

class Customer extends Model { }

Customer.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cfr: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cover_image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    city_of_birth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    task: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
    {
        sequelize,
        modelName: 'Customer'
    })

Customer.belongsTo(User, { foreignKey: 'user_id' })

module.exports = Customer