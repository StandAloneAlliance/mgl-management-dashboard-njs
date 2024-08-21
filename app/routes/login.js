const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config');
const passport_guests = require('../config/passport-config-guests')

// ROTTE DI LOGIN PER USER
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/user/dashboard');
    res.render('login', { message: req.flash('loginFallito') });
});

router.post('/login', (req, res, next) => {
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


// ROTTE DI LOGIN PER I GUEST
router.get('/guest-login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/guest-dashboard')
    res.render('guest-login', { message: req.flash('loginFallito') });
})

router.post('/guest-login', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        passport_guests.authenticate('local-guest-login', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                console.log('Autenticazione fallita:', info.message);
                return res.redirect('/guest-login');
            }

            req.logIn(user.guest, (err) => {
                if (err) {
                    return next(err);
                }

                return res.redirect('/guest/dashboard')
                // return res.render('guest-dashboard', { guest: user.guest, courses: user.courses });
            });
        })(req, res, next);
    });
});

// ROTTA DI LOGOUT
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error('Errore durante il logout:', err);
            return res.status(500).redirect('/user/dashboard');
        }
    });
    res.redirect('/');
});
module.exports = router;