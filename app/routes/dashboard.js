const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/check-user-login')

router.get('/dashboard', isAuth(), (req, res) => {
    res.render('dashboard', { user: req.user })
})

module.exports = router