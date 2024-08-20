
const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME_TEST, process.env.DB_USERNAME_TEST, process.env.DB_PASSWORD_TEST, {
    host: process.env.DB_HOST_TEST,
    dialect: process.env.DB_CONNECTION_TEST,
    dialectOptions: {
        // Observe the need for this nested `options` field for MSSQL
        options: {
            // Your tedious options here
            useUTC: false,
            dateFirst: 1,
        },
    },
    logging: console.log
});

module.exports = sequelize;