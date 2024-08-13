const { User } = require('../../models/index');

function ensureAuthenticatedUser(req, res, next) {
    console.log('Checking User authentication:', req.user);
    if (req.isAuthenticated() && req.user instanceof User) {
        return next();
    } else {
        return res.redirect('/guest-login');  // O altra pagina di errore
    }
}
module.exports = ensureAuthenticatedUser

