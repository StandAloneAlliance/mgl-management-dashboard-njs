// courses.js
const fs = require('fs');
const path = require('path');

// Percorso del file di configurazione dei corsi
const coursesFilePath = path.join(__dirname, 'courses_type.json');

// Funzione per leggere i corsi dal file
function getCourses() {
    try {
        // Leggi il file dei corsi
        const coursesData = fs.readFileSync(coursesFilePath, 'utf8');
        // Parsa i dati JSON
        const courses = JSON.parse(coursesData);
        return courses;
    } catch (error) {
        console.error('Errore durante la lettura del file dei corsi:', error);
        return [];
    }
}

// Esporta la funzione per ottenere i corsi
module.exports = getCourses;
