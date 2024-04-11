const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    const html = `Ciao ${req.user.username}<a href='/logout'>Effettua il logout</a>`;
    res.send(html);
});

module.exports = router;