const express = require('express')
const router = express.Router()
const { Guest, Customer, Course } = require('../../models/index')

router.get('/dashboard', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/guest-login')
    }
    const customer = await Customer.findOne({ where: { cfr: req.user.fiscal_code } })
    let courses = []
    if (customer) {
        courses = await Course.findAll({
            include: [{
                model: Customer,
                where: { id: customer.id },
                through: { attributes: [] }
            }]
        });
    }

    const guest = req.user

    console.log(courses, guest)
    res.render('guest-dashboard', { guest: guest, courses: courses || [] })
})

module.exports = router