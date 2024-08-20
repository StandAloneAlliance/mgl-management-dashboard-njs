const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Guest, Customer, Course } = require('../../models/index');
const bcrypt = require('bcrypt');

// Strategia per i guest
passport.use('local-guest-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const guest = await Guest.findOne({ where: { email } });
        if (!guest) {
            return done(null, false, { message: 'Ospite non trovato' });
        }

        const isValidPassword = await bcrypt.compare(password, guest.password);
        if (!isValidPassword) {
            return done(null, false, { message: 'Password non valida' });
        }

        const customer = await Customer.findOne({ where: { cfr: guest.fiscal_code } })
        let courses = []
        if (customer) {
            courses = await Course.findAll({
                include: [{
                    model: Customer,
                    through: { attributes: [] }
                }]
            });
            console.log(courses)
        }

        return done(null, { guest, courses });
    } catch (error) {
        return done(error);
    }
}));


passport.serializeUser((user, done) => {
    done(null, { id: user.id, type: user instanceof User ? 'User' : 'Guest' });
});

passport.deserializeUser(async (obj, done) => {
    try {
        let user;
        if (obj.type === 'User') {
            user = await User.findByPk(obj.id);
        } else if (obj.type === 'Guest') {
            user = await Guest.findByPk(obj.id);
        }

        if (!user) {
            return done(new Error('Utente non trovato'));
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport