const moment = require('moment');
const Course = require('../../models/index').Course
const { Sequelize } = require('sequelize')

async function updateExpiratingCourseStatus() {
    try {
        const today = moment().format('YYYY-MM-DD HH:mm:ss')

        const courses = await Course.findAll({
            where: {
                data_scadenza: {
                    [Sequelize.Op.lt]: moment().subtract(8, 'days').toDate() // Converti la data di scadenza nel formato corretto
                }
            }
        });

        for (const course of courses) {
            await course.update({ status: 'In Scadenza' });
            console.log(`Aggiornato lo stato del corso ${course.id} a In Scadenza`);
        }
    } catch (error) {
        console.error('Error updating course statuses:', error);
    }
}


module.exports = { updateExpiratingCourseStatus }
