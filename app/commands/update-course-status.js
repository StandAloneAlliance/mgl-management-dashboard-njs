const cron = require('node-cron')
const moment = require('moment')
const Course = require('../../models/index').Course

async function checkAndUpdateExpiredCourses() {
    const today = moment();
    console.log('Controllo e aggiornamento dei corsi scaduti:', today.format('YYYY-MM-DD HH:mm:ss'));

    try {
        // Trova tutti i corsi con data di scadenza inferiore alla data odierna
        const expiredCourses = await Course.findAll({
            where: {
                data_scadenza: {
                    [Sequelize.Op.lt]: today.toDate() // Opzione "less than" di Sequelize
                }
            }
        });

        // Aggiorna lo stato dei corsi scaduti a false
        for (const course of expiredCourses) {
            await course.update({ status: 'Scaduto' });
            console.log(`Aggiornato lo stato del corso ${course.id} a scaduto`);
        }
    } catch (error) {
        console.error('Errore durante il controllo e l\'aggiornamento dei corsi scaduti:', error);
    }
}


const startScheduler = () => {
    cron.schedule('0 0 * * *', () => {
        console.log('Esecuzione del task scheduler ogni giorno alle 00:00');
        checkAndUpdateExpiredCourses();
    });
};

module.exports = { startScheduler }
