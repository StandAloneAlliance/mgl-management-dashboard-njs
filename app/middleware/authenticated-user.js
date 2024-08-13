const { User } = require('../../models/index');

function ensureAuthenticatedUser(req, res, next) {
    if (req.isAuthenticated() && req.user instanceof User) {
        return next();
    } else {
        return res.redirect('/guest-login');
    }
}
module.exports = ensureAuthenticatedUser

