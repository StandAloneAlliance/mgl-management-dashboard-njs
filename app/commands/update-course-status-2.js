const moment = require('moment');
const Course = require('../../models/index').Course
const { Sequelize } = require('sequelize')

async function updateExpiratingCourseStatus() {
    try {
        const today = moment()
        const thirtyDaysFromNow = moment().add(30, 'days')

        const courses = await Course.findAll({
            where: {
                data_scadenza: {
                    [Sequelize.Op.between]: [today.toDate(), thirtyDaysFromNow.toDate()] // Converti la data di scadenza nel formato corretto
                }
            }
        });

        for (const course of courses) {
            await course.update({ status: 'In Scadenza' });
        }
    } catch (error) {
        console.error('Error updating course statuses:', error);
    }
}


module.exports = { updateExpiratingCourseStatus }
