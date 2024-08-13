'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,  // Assicurati che il campo non sia nullo
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,  // Assicurati che il campo non sia nullo
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,  // Assicurati che il campo non sia nullo
        unique: true,  // Imposta l'email come unica
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,  // Può essere nullo
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,  // Assicurati che il campo non sia nullo
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Guests');
  }
};
