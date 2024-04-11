const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/index').User

passport.use('local-login', new LocalStrategy(
    async (email, password, done) => {
        try {
            const user = await User.getUserByEmail({ email: email })
            if (!user) {
                return done(null, false, { message: 'Email non valida' })
            }

            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    console.log('Invalid Password');
                    return done(null, false, {
                        message: 'Invalid Password'
                    });
                }
            });

            // const isValidPw = user.isValidPassword(password)
            // if (!isValidPw) {
            //     return done(null, false, { message: 'Password non valida' })
            // }

            // return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})


module.exports = passport