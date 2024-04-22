const { Course } = require('../../models/index')
const nodemailer = require('nodemailer');
const expiry_courses = require('../config/get-expiry-courses')
require('dotenv').config()

const receiverEmail = process.env.MAIL_USERNAME

// Definisci la funzione per inviare l'email ai corsisti con corsi scaduti o in scadenza
async function sendExpiringCoursesEmail() {
    try {
        // Ottieni i corsisti con corsi scaduti o in scadenza
        const clientsWithExpiringCourses = await expiry_courses.getClientsWithExpiringCourses()

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // Itera sui corsisti con corsi scaduti o in scadenza
        for (const customer of clientsWithExpiringCourses) {
            // Costruisci il corpo dell'email includendo i dettagli del cliente e dei corsi associati
            const emailBody = `
                <h1>Salve Grazia Matera</h1>
                <p>Questa è una notifica per informarla che alcuni dei suoi corsi sono scaduti o sono in scadenza.</p>
                <p>Ecco i corsi interessati:</p>
                <ul>
                    ${customer.Courses.map(course => `<li>${course.name} - ${course.status}</li>`).join('')}
                </ul>
                <p>Per favore, contatti l'amministratore per ulteriori informazioni.</p>
            `;

            // Definisci le opzioni per l'invio dell'email
            const mailOptions = {
                from: receiverEmail,
                to: receiverEmail,
                subject: 'Corsi scaduti o in scadenza',
                html: emailBody
            };

            const courseId = parseInt(customer.Courses.map(course => course.id));
            const course = await Course.findByPk(courseId)
            if (course.email_sent === false) {
                // Invia l'email
                await transporter.sendMail(mailOptions);
                console.log(`Email inviata a ${receiverEmail}`);
                await course.update({ email_sent: true })
            }
        }
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email:', error);
        throw error;
    }
}


module.exports = { sendExpiringCoursesEmail }