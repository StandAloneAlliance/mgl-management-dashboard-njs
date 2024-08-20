const express = require('express')
const router = express.Router()
const { Guest } = require('../../models/index')

router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/guest-login')
    }
    res.render('guest-dashboard')
})

module.exports = router