const express = require('express')
const bcrypt = require('bcrypt')

// RECUPERO IL MODEL USER DALL'INDEX.JS CHE GESTISCE I MODEL
const User = require('../../models/index').User
const { Guest } = require('../../models/index')
const router = express.Router()

// CREO LA ROTTA GET PER LA REGISTRAZIONE NELLA VIEW register.ejs
router.get('/register', (req, res) => {
    res.render('register')
})


// ROTTA PER LA REGISTRAZIONE DELL'UTENTE NELLA VIEW register.ejs
router.post('/register', async (req, res) => {

    // RECUPERO IL BODY DELLA REQUEST
    const { name, surname, email, password } = req.body

    try {
        // EFFETTUO UN CONTROLLO SE L'UTENTE CHE STA PER EFFETTUARE LA REGISTRAZIONE HA UN EMAIL GIA SALVATA NEL DB
        const existing_user = await User.findOne({ where: { email: email } })
        // STAMPO L'ERRORE 
        if (existing_user) {
            res.status(400).send('Email già in uso')
        }

        // FACCIO L'HASHING DELLA PASSWORD
        const hashed_pw = await bcrypt.hash(password, 10)

        // CREO IL NUOVO RECORD
        const user = await User.create({
            name: name,
            surname: surname,
            email: email,
            password: hashed_pw
        })
        res.status(200)
        res.redirect('/user/dashboard')
    } catch (error) {
        // ALTRIMENTI STAMPO L'ERRORE 500
        console.error(error)
        res.status(500).send('Errore del server')
    }
})

router.get('/guest-register', (req, res) => {
    res.render('guest-register')
})

// ROTTA PER LA REGISTRAZIONE DELL'UTENTE NELLA VIEW register.ejs
router.post('/guest-register', async (req, res) => {
    try {
        const { firstName, lastName, email, phonenumber, password } = req.body;

        // Debug: Verifica che i campi siano stati estratti correttamente
        console.log(firstName, lastName, email, phonenumber, password);
        console.log(req.body)


        // EFFETTUO UN CONTROLLO SE L'UTENTE CHE STA PER EFFETTUARE LA REGISTRAZIONE HA UN EMAIL GIA SALVATA NEL DB
        const existing_guest = await Guest.findOne({ where: { email: email } })
        // STAMPO L'ERRORE 
        if (existing_guest) {
            res.status(400).send('Email già in uso')
        }

        // FACCIO L'HASHING DELLA PASSWORD
        const hashed_pw = await bcrypt.hash(password, 10)

        const guest = await Guest.create({
            firstName,
            lastName,
            email,
            phonenumber,
            password: hashed_pw,
        });
        res.status(200)
        res.redirect('/guest/dashboard')
    } catch (error) {
        // ALTRIMENTI STAMPO L'ERRORE 500
        console.error(error)
        res.status(500).send('Errore del server')
    }
})

module.exports = router