const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../../models/index').User
const router = express.Router()

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const { name, surname, email, password } = req.body
    console.log(req.body)

    try {
        const existing_user = await User.findOne({ where: { email: email } })
        console.log(existing_user)
        if (existing_user) {
            res.status(400).send('Email già in uso')
        }

        const hashed_pw = await bcrypt.hash(password, 10)

        const user = await User.create({
            name: name,
            surname: surname,
            email: email,
            password: hashed_pw
        })
        res.status(201).send('Utente creato con successo')
    } catch (error) {
        console.error(error)
        res.status(500).send('Errore del server')
    }
})

module.exports = router