const express = require('express')
const router = express.Router()
const { Guest, Customer, Course } = require('../../models/index')

router.get('/dashboard', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/guest-login')
    }
    const customer = await Customer.findOne({ where: { cfr: req.user.fiscal_code } })
    let courses = []
    if (customer) {
        courses = await Course.findAll({
            include: [{
                model: Customer,
                where: { id: customer.id },
                through: { attributes: [] }
            }]
        });
    }

    const guest = req.user

    console.log(courses, guest)
    res.render('guest/guest-dashboard', { guest: guest, courses: courses || [] })
})

router.get('/dashboard/courses', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/guest-login')
    }

    // 2. Recupera il guest autenticato
    const guest = req.user;

    // 3. Trova il customer associato al guest tramite il codice fiscale
    const customer = await Customer.findOne({ where: { cfr: guest.fiscal_code } });

    if (!customer) {
        // Se non c'è un customer associato, reindirizza o mostra un messaggio
        return res.render('guest-dashboard', { guest: guest, courses: [], message: 'Non sei associato a nessun corso.' });
    }

    // 4. Recupera i corsi associati al customer
    const courses = await Course.findAll({
        include: [{
            model: Customer,
            where: { id: customer.id }, // Filtra solo i corsi associati al customer corrente
            through: { attributes: [] } // Ignora la tabella di join
        }]
    });

    // 5. Renderizza la pagina con i corsi
    res.render('guest/courses/index-courses', { guest: guest, courses: courses });
})

module.exports = router