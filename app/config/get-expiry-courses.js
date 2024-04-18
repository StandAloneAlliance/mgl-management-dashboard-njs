const { Sequelize } = require('sequelize')
const Course = require('../../models/index').Course
const Customer = require('../../models/index').Customer

async function getClientsWithExpiringCourses() {
    try {
        const clientsWithExpiringCourses = await Customer.findAll({
            include: [{
                model: Course,
                through: { attributes: [] },
                attributes: ['id', 'nome_corso', 'status', 'data_scadenza'], // Rimuovi l'elenco degli attributi dalla tabella pivot
                where: {
                    status: ['Scaduto', 'In Scadenza'] // Filtra i corsi per lo status
                },
                // Specifica le colonne necessarie dalla tabella Course
            }]
        });
        console.log(clientsWithExpiringCourses)

        return clientsWithExpiringCourses
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { getClientsWithExpiringCourses }