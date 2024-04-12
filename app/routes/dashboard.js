const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/check-user-login')
const Customer = require('../../models/index').Customer

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
    res.render('customers/create-customers')
})

router.post('/dashboard/customers/create-customers', async (req, res) => {
    const { name, surname, cfr, email, cover_image, date_of_birth, city_of_birth, task } = req.body
    try {
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
        console.log(req.body)
        res.status(200)
        res.redirect('/user/dashboard')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router