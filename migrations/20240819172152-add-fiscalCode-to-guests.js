'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('guests', 'fiscal_code', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      after: 'lastName'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('guests', 'fiscal_code');
  }
};

