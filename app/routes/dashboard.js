const express = require('express');
const moment = require('moment')
const router = express.Router();
const Customer = require('../../models/index').Customer
const { Course, sequelize } = require('../../models/index')
const getCourses = require('../config/courses_type')
const { validateInputs, checkValidationResults } = require('../middleware/create-customers-validator')
const { editValidateInputs, checkEditValidationResults } = require('../middleware/edit-customers-validator')


router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    res.render('dashboard', { user: req.user })
})

router.get('/dashboard/customers', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    try {
        const customers = await Customer.findAll()
        res.render('customers/index-customers', { customers: customers })
    } catch (error) {
        console.error(error)
        res.status(500).send('Errore del server')
    }
})

router.get('/dashboard/customers/create-customers', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    res.render('customers/create-customers', { formData: req.body })
})


// ROTTA POST PER LA CREAZIONE DEL CORSISTA 
router.post('/dashboard/customers/create-customers', validateInputs, checkValidationResults, async (req, res) => {
    const { name, surname, cfr, email, cover_image, date_of_birth, city_of_birth, task } = req.body
    try {

        //INSERISCO I RECORD NEL DB
        const newCustomer = await Customer.create({
            name: name,
            surname: surname,
            cfr: cfr,
            email: email,
            cover_image: cover_image,
            date_of_birth: date_of_birth,
            city_of_birth: city_of_birth,
            task: task,
            user_id: req.user.id,
        })

        // SE L'OPERAZIONE VA A BUON FINE
        res.status(200)
        res.redirect('/user/dashboard/customers')
    } catch (error) {
        // SE NON VA A BUON FINE
        res.status(500).send(error.message)
        // DA MODIFICARE LA GESTIONE DELL'ERRORE CREANDO DELLE PAGINE DI ERRORE CON IL REDIRECT
    }
})

// ROTTA GET PER LA SHOW DEL CORSISTA CON UN DETERMINATO ID
router.get('/dashboard/customers/:id', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    try {
        // ESTRAGGO L'ID DEL CORSISTA DAI PARAMETRI DI PERCORSO
        const { id } = req.params;

        // TROVO IL CORSISTA NEL DB BASATO SULL'ID
        const customer = await Customer.findOne({ where: { id: id }, include: { model: Course, through: { attributes: [] } } });
        const courses = customer.Courses
        if (customer) {
            const numberOfCourses = customer.Courses.length;

            if (numberOfCourses > 0) {
                console.log(`Il cliente ha ${numberOfCourses} corsi associati.`);
            } else {
                console.log("Il cliente non ha corsi associati.");
            }
        } else {
            console.log("Cliente non trovato.");
        }
        // VERIFICO SE IL CORISTA ESISTE
        if (customer) {
            // SE IL CORSISTA è STATO TROVATO DO IL RENDER SULLA VIEW
            res.render('customers/customer-details', { customer: customer, courses: courses });
        } else {
            // Se il corsista non è stato trovato, restituisci un messaggio di errore o reindirizza a una pagina di errore
            res.status(404).send('Corsista non trovato');
            // DA IMPLEMENTARE MEGLIO LA GESTIONE DEGLI ERRORI CON REDIRECT
        }
    } catch (error) {
        // DA IMPLEMENTARE MEGLIO LA GESTIONE DEGLI ERRORI CON REDIRECT
        res.status(500).send('Errore nel recupero dei dettagli del corsista');
    }
})


// ROTTA GET PER L'ASSEGNAZIONE DEL CORSO AL CORSISTA CON UN DETERMINATO ID
router.get('/dashboard/customers/:id/assign-courses', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }

    try {
        const courses = getCourses()
        // Ottieni l'id del corsista dalla richiesta
        const customerId = req.params.id;
        console.log(customerId)

        // Qui puoi ottenere le informazioni del corsista dal database
        // Ad esempio, usando un modello Sequelize o Mongoose
        // const customer = await Customer.findByPk(customerId);

        // Passa le informazioni del corsista alla vista
        res.render('customers/assign-courses', { customerId: customerId, courses: courses });
    } catch (error) {
        // Gestisci gli errori qui
        console.error(error);
        res.status(500).send('Errore nel caricamento della pagina di assegnazione del corso');
    }
})

// ROTTA POST PER L'ASSEGNAZIONE DEL CORSO AL CORSISTA CON UN DETERMINATO ID
router.post('/dashboard/customers/:customerId/assign-courses', async (req, res) => {
    try {
        // Ottieni l'ID del corsista dalla richiesta
        const customerId = req.params.customerId;

        // Ottieni i dati del corso dal corpo della richiesta
        const {
            nome_corso,
            posti_disponibili,
            cap_sede_corso,
            città_di_svolgimento,
            indirizzo_di_svolgimento,
            provincia,
            direttore_corso,
            docenti_corso,
            inizio_di_svolgimento,
            fine_svolgimento,
            genere_corso,
            numero_autorizzazione,
            durata_corso,
            status,
            data_scadenza,
            validità
        } = req.body;

        // FUNZIONE CHE CALCOLA LA DATA DI SCADENZA DIRETTAMENTE CLACLOANDO DATA FINE CORSO CON LA VALIDITà
        function calculateExpiryDate(endDate, validityYears) {
            // Parsa la data di fine corso con moment.js
            const endDateMoment = moment(endDate);

            // Aggiungi il numero di anni di validità alla data di fine corso
            const expiryDateMoment = endDateMoment.add(validityYears, 'years');

            // Restituisci la data di scadenza
            return expiryDateMoment.format('YYYY-MM-DD');
        }

        const expiry_date = calculateExpiryDate(fine_svolgimento, validità)

        // Crea un nuovo corso nella tabella courses
        const newCourse = await Course.create({
            nome_corso: nome_corso,
            posti_disponibili: posti_disponibili,
            cap_sede_corso: cap_sede_corso,
            città_di_svolgimento: città_di_svolgimento,
            indirizzo_di_svolgimento: indirizzo_di_svolgimento,
            provincia: provincia,
            direttore_corso: direttore_corso,
            docenti_corso: docenti_corso,
            inizio_di_svolgimento: inizio_di_svolgimento,
            fine_svolgimento: fine_svolgimento,
            genere_corso: genere_corso,
            numero_autorizzazione: numero_autorizzazione,
            durata_corso: durata_corso,
            status: status,
            data_scadenza: expiry_date,
            validità: validità
        });

        // Ottieni l'ID del corso appena creato
        const courseId = newCourse.id;

        // ESEGUO LA QUERY CHE HO SCRITTO SOPRA
        await sequelize.query(`INSERT INTO course_customer (course_id, customer_id) VALUES (?, ?)`, {
            replacements: [courseId, customerId]
        });
        res.redirect(`/user/dashboard/customers/${customerId}`);
    } catch (error) {
        // IMPLEMENTARE MEGLIO LA GESTIONE DEGLI ERRORI
        console.error('Errore durante l\'assegnazione del corso:', error);
        res.status(500).redirect('/user/dashboard/customers')
    }
})

router.get('/dashboard/customers/:customerId/edit', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    try {
        const customerId = req.params.customerId;
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).redirect(`user/dashboard/customers/${customerId}`);
        }
        res.render('customers/update-customers', { customer: customer }); // Assicurati di passare correttamente il cliente al template
    } catch (error) {
        console.error('Error retrieving customer details:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/dashboard/customers/:id/edit', editValidateInputs, checkEditValidationResults, async (req, res) => {
    try {
        // Trova il cliente dal database
        const customer = await Customer.findByPk(req.params.id);

        // Se il cliente non esiste, restituisci un errore
        if (!customer) {
            return res.status(404).redirect(`user/dashboard/customers/${req.params.id}`);
        }

        // Aggiorna i dati del cliente con i nuovi dati inviati nella richiesta
        await customer.update(req.body);

        // Reindirizza alla pagina del cliente aggiornata
        res.status(200).redirect(`/user/dashboard/customers`);
    } catch (error) {
        console.error('Errore durante l\'aggiornamento dei dati del cliente:', error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

router.get('/dashboard/customers/:customerId/courses/:courseId/edit', async (req, res) => {
    if (!req.isAuthenticated) {
        res.redirect('/login')
    }
    try {
        const { customerId, courseId } = req.params
        const courses = getCourses()
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Corsista non trovato' });
        }

        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Corso non trovato' });
        }
        res.render('courses/edit-courses', { customerId: customerId, courseId: courseId, course: course, courses: courses })

    } catch (error) {

    }
})

router.put('/dashboard/customers/:customerId/courses/:courseId/edit', async (req, res) => {
    try {
        const { customerId, courseId } = req.params;

        // Trova il cliente dal database
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Cliente non trovato' });
        }

        // Trova il corso associato al cliente dal database
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ error: 'Corso non trovato' });
        }


        // Aggiorna i dettagli del corso
        await course.update(req.body);

        // Reindirizza alla pagina del corso aggiornata
        res.redirect(`/user/dashboard/customers/${customerId}`);
    } catch (error) {
        console.error('Errore durante l\'aggiornamento dei dettagli del corso:', error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

router.delete('/dashboard/customers/:customerId/courses/:courseId/delete', async (req, res) => {
    const { customerId, courseId } = req.params;
    try {
        const course = await Course.findByPk(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Corso non trovato' });
        }

        // Elimina il corso dalla tabella dei corsi
        await course.destroy();
        res.redirect(`/user/dashboard/customers/${customerId}`)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


// ROTTA PER L'ELIMINAZIONE DEL CORISTA DA IMPLEMENTARE MEGLIO ANCHE CON L'ELIMINAZIONE DEI CORSI ASSOCIATI
router.delete('/dashboard/customers/:id/delete', async (req, res) => {
    const customerId = req.params.id;
    try {
        // Esegui l'eliminazione del corsista con l'id specificato
        await Customer.destroy({
            where: {
                id: customerId
            }
        });
        // Reindirizza l'utente a una pagina appropriata dopo l'eliminazione del corsista
        res.redirect('/user/dashboard/customers');
    } catch (error) {
        // Gestisci eventuali errori
        console.error("Errore durante l'eliminazione del corsista:", error);
        res.status(500).send("Si è verificato un errore durante l'eliminazione del corsista.");
    }
});

module.exports = router