const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const { User, Guest } = require('../../models/index')

// Strategia per gli user
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    async (req, email, password, done) => {
        try {
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                return done(null, false, { message: 'Utente non trovato' });
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return done(null, false, { message: 'Password non valida' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

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