const moment = require('moment');
const Course = require('../../models/index').Course
const { Sequelize } = require('sequelize')

async function updateCourseStatus() {
    try {
        const today = moment().format('YYYY-MM-DD HH:mm:ss')

        const courses = await Course.findAll({
            where: {
                data_scadenza: {
                    [Sequelize.Op.gte]: moment().toDate() // Utilizziamo l'operatore "less than or equal to" per includere anche i corsi scaduti oggi
                }
            }
        }); // Assicurati che il metodo findAll del modello Course restituisca tutti i corsi


        for (const course of courses) {
            console.log(moment(course.data_scadenza).format('YYYY-MM-DD HH:mm:ss'));
            if (moment(course.data_scadenza).isAfter(today)) {
                await course.update({ status: 'Scaduto' });
                console.log(`Aggiornato lo stato del corso ${course.id} a Scaduto`);
            }
            // Se la data di scadenza è oggi, impostiamo lo status su "Scaduto"

            console.log('Course statuses updated successfully.');
        }

    } catch (error) {
        console.error('Error updating course statuses:', error);
    }
}


module.exports = { updateCourseStatus }
