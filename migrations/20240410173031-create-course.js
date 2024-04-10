'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      nome_corso: {
        type: Sequelize.STRING(255)
      },
      posti_disponibili: {
        type: Sequelize.INTEGER
      },
      indirizzo_di_svolgimento: {
        type: Sequelize.STRING(40)
      },
      cap_sede_corso: {
        type: Sequelize.INTEGER
      },
      città_di_svolgimento: {
        type: Sequelize.STRING(25)
      },
      provincia: {
        type: Sequelize.STRING(4)
      },
      direttore_corso: {
        type: Sequelize.STRING(35)
      },
      docenti_corso: {
        type: Sequelize.STRING(35)
      },
      inizio_di_svolgimento: {
        type: Sequelize.DATE
      },
      fine_svolgimento: {
        type: Sequelize.DATE
      },
      genere_corso: {
        type: Sequelize.STRING(25)
      },
      numero_autorizzazione: {
        type: Sequelize.STRING
      },
      durata_corso: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Valido'
      },
      data_scadenza: {
        type: Sequelize.DATE
      },
      validità: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};