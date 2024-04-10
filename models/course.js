'use strict';
const { Model } = require('sequelize');
const Customer = require('./customer')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsToMany(models.Customer, { through: 'CourseCustomer' })
    }
  }
  Course.init({
    nome_corso: DataTypes.STRING,
    posti_disponibili: DataTypes.INTEGER,
    indirizzo_di_svolgimento: DataTypes.STRING,
    cap_sede_corso: DataTypes.INTEGER,
    città_di_svolgimento: DataTypes.STRING,
    provincia: DataTypes.STRING,
    direttore_corso: DataTypes.STRING,
    docenti_corso: DataTypes.STRING,
    inizio_di_svolgimento: DataTypes.DATE,
    fine_svolgimento: DataTypes.DATE,
    genere_corso: DataTypes.STRING,
    numero_autorizzazione: DataTypes.STRING,
    durata_corso: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Valido'
    },
    data_scadenza: DataTypes.DATE,
    validità: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};