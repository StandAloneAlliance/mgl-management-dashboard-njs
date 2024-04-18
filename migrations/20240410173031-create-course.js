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
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      posti_disponibili: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      indirizzo_di_svolgimento: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      cap_sede_corso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      città_di_svolgimento: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      provincia: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      direttore_corso: {
        type: Sequelize.STRING(35),
        allowNull: false,
      },
      docenti_corso: {
        type: Sequelize.STRING(35),
        allowNull: false,
      },
      inizio_di_svolgimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fine_svolgimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      genere_corso: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      numero_autorizzazione: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      durata_corso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Valido',
        allowNull: false,
      },
      data_scadenza: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      validità: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
  }
};