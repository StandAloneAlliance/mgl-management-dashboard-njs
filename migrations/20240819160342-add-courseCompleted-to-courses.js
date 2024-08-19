'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('courses', 'course_completed', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Il corso non è completato per default
      after: 'email_sent'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('courses', 'course_completed');
  }
};
