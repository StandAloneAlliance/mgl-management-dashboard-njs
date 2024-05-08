const { body, validationResult, ValidationError } = require('express-validator');
const { Customer } = require('../../models/index')

// Regole di validazione per il campo "name"
const validateName = body('name')
    .notEmpty().withMessage('Il nome è obbligatorio')
    .isLength({ max: 60 }).withMessage('Il nome deve avere al massimo :max caratteri');

// Regole di validazione per il campo "surname"
const validateSurname = body('surname')
    .notEmpty().withMessage('Il cognome è obbligatorio')
    .isLength({ max: 60 }).withMessage('Il cognome deve avere al massimo :max caratteri');

// Regole di validazione per il campo "cfr"
const validateCFR = body('cfr')
    .notEmpty().withMessage('Il Codice Fiscale è obbligatorio')
    .isLength({ min: 16, max: 16 }).withMessage('Il Codice Fiscale deve avere una lunghezza di 16 caratteri')
// .custom(async (cfr, { req }) => {
//     const customerId = req.params.id
//     //Verifica se il Codice Fiscale è unico nel database
//     const existingCustomer = await Customer.findOne({ where: { cfr: cfr, id: { $ne: customerId } } });
//     console.log(existingCustomer)
//     if (existingCustomer == req.body.cfr) {
//         throw new ValidationError('Questa Codice Fiscale è già stato utilizzato');
//     }
//     console.log(req.body.cfr)
// });

// Regole di validazione per il campo "email"
const validateEmail = body('email')
    .optional().isEmail().withMessage('Inserisci un indirizzo email valido');


// Regole di validazione per il campo "date_of_birth"
const validateDateOfBirth = body('date_of_birth')
    .notEmpty().withMessage('La data di nascita è obbligatoria');

// Regole di validazione per il campo "city_of_birth"
const validateCityOfBirth = body('city_of_birth')
    .notEmpty().withMessage('La città di nascita è obbligatoria')
    .isLength({ max: 60 }).withMessage('La città di nascita deve avere al massimo :max caratteri');

// Regole di validazione per il campo "task"
const validateTask = body('task')
    .optional().isLength({ max: 70 }).withMessage('La mansione deve avere al massimo :max caratteri');

const editValidateInputs = [
    validateName,
    validateSurname,
    validateCFR,
    validateEmail,
    validateDateOfBirth,
    validateCityOfBirth,
    validateTask
]
// Funzione per controllare gli errori di validazione
const checkEditValidationResults = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.errors)
    if (!errors.isEmpty()) {
        return res.status(400).render('customers/update-customers', { errors: errors.errors });
    }
    next();
};
module.exports = { editValidateInputs, checkEditValidationResults };
