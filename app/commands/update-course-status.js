const moment = require('moment');
const Course = require('../../models/index').Course
const { Sequelize } = require('sequelize')

async function updateCourseStatus() {
    try {
        const today = moment().format('YYYY-MM-DD HH:mm:ss')

        const courses = await Course.findAll({
            where: {
                data_scadenza: {
                    [Sequelize.Op.lte]: today // Utilizziamo l'operatore "less than or equal to" per includere anche i corsi scaduti oggi
                }
            }
        });
        // Assicurati che il metodo findAll del modello Course restituisca tutti i corsi

        for (const course of courses) {
            await course.update({ status: 'Scaduto' })
        }

    } catch (error) {
        console.error('Error updating course statuses:', error);
    }
}


module.exports = { updateCourseStatus }
