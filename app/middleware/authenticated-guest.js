const { Guest } = require('../../models/index')

function ensureAuthenticatedGuest(req, res, next) {
    if (req.isAuthenticated() && req.user instanceof Guest) {
        return next();
    } else {
        return res.redirect('/login');
    }
}
module.exports = ensureAuthenticatedGuest

