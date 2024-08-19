const { Model } = require('sequelize');
const { Course, Guest } = require('../models/index');
module.exports = (sequelize, DataTypes) => {
    class Attestation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Attestation.belongsTo(models.Guest, { foreignKey: 'guest_id' });
            Attestation.belongsTo(models.Course, { foreignKey: 'course_id' });
        }
    }

    Attestation.init({
        guest_id: {
            type: DataTypes.INTEGER, // Deve corrispondere al tipo della colonna `id` nella tabella `Guests`
            allowNull: false,
            references: {
                model: Guest, // Nome della tabella
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        course_id: {
            type: DataTypes.BIGINT, // Deve corrispondere al tipo della colonna `id` nella tabella `Courses`
            allowNull: false,
            references: {
                model: Course, // Nome della tabella
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        filePath: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        paymentToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isUnlocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'Attestation',
        tableName: 'attestations',
    });
    return Attestation
}



