const passport = require('passport')
const { where } = require('sequelize')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/index').User

passport.use('local-login', new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username: username } })
            console.log(user)
            if (!user) {
                return done(null, false, { message: 'Username non valido' })
            }

            const isValidPw = user.isValidPassword(password)
            console.log(isValidPw)
            if (!isValidPw) {
                return done(null, false, { message: 'Password non valida' })
            }

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
    console.log(user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        console.log(User)
        console.log('Deserializing user with id:', id);
        const user = await User.findOne({ where: { id: id } })
        console.log('Deserialized user:', user);
        done(null, user)
    } catch (error) {
        console.error('Error deserializing user:', error);
        done(error)
    }
})


module.exports = passport