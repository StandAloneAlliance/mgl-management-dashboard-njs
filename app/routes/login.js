const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config');
const passport_guests = require('../config/passport-config-guests')

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('login', { message: req.flash('loginFallito') });
});

// router.post('/login', passport.authenticate('local-login', {
//     successRedirect: '/user/dashboard',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

router.post('/login', (req, res, next) => {
    // Logout dalla sessione corrente con callback
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        passport.authenticate('local-login', {
            successRedirect: '/user/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    });
});

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error('Errore durante il logout:', err);
            return res.status(500).redirect('/user/dashboard');
        }
    });
    res.redirect('/');
});

router.get('/guest-login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/guest/dashboard')
    res.render('guest-login', { message: req.flash('loginFallito') });
})


// router.post('/guest-login', passport.authenticate('local-guest-login', {
//     successRedirect: '/guest/dashboard',
//     failureRedirect: '/guest-login',
//     failureFlash: true
// }));

router.post('/guest-login', (req, res, next) => {
    // Logout dalla sessione corrente con callback
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        passport_guests.authenticate('local-guest-login', {
            successRedirect: '/guest/dashboard',
            failureRedirect: '/guest-login',
            failureFlash: true
        })(req, res, next);
    });
});
module.exports = router;