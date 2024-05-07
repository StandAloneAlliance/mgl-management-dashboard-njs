const express = require('express')
const router = express.Router()
const { Customer } = require('../../models/index')
const { Sequelize } = require('sequelize')

router.get('/user/dashboard/search_customers', async (req, res) => {
    try {
        const { nome, cognome, codice_fiscale } = req.query
        const filter = {}
        if (nome) {
            filter.name = { [Sequelize.Op.like]: `%${nome}%` }
        }

        if (cognome) {
            filter.surname = { [Sequelize.Op.like]: `%${cognome}%` }
        }

        if (codice_fiscale) {
            filter.cfr = { [Sequelize.Op.like]: `%${codice_fiscale}%` }
        }

        const customers = await Customer.findAll({ where: filter })
        res.render('customers/index-customers', { customers: customers })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

module.exports = router