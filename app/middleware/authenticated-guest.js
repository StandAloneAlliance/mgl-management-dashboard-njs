const { Guest } = require('../../models/index')

function ensureAuthenticatedGuest(req, res, next) {
    console.log('Checking Guest authentication:', req.user);
    if (req.isAuthenticated() && req.user instanceof Guest) {
        return next();
    } else {
        return res.redirect('/login');  // O altra pagina di errore
    }
}
module.exports = ensureAuthenticatedGuest

