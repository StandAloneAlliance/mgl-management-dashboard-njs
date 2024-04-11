const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/check-user-login')

router.get('/dashboard', isAuth(), (req, res) => {
    res.render('dashboard', { user: req.user })
})

router.get('/dashboard/customers', isAuth(), (req, res) => {
    res.render('customers/index-customers')
})

router.get('/dashboard/customers/create-customers', isAuth(), (req, res) => {
    res.render('customers/create-customers')
})

module.exports = router