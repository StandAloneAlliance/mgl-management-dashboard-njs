
const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            requestTimeout: 30000 // 30 secondi di timeout
        }
    }
})

module.exports = sequelize;