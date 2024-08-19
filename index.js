require('dotenv').config()
const express = require('express');
const session = require('express-session')
const path = require('path')
const passport = require('passport');
const sequelize = require('./app/config/db-connection');
const flash = require('connect-flash');
const update_course_scheduler = require('./app/commands/update-course-status')
const update_expirating_course_status = require('./app/commands/update-course-status-2')
const cron = require('node-cron')
const mail = require('./app/mail/expiration-notification')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const ensureAuthenticatedGuest = require('./app/middleware/authenticated-guest')
const ensureAuthenticatedUser = require('./app/middleware/authenticated-user')
const port = process.env.PORT;
console.log(process.env.NODE_ENV, process.env.PORT)

// ROTTE
const loginRouter = require('./app/routes/login');
const homeRouter = require('./app/routes/home');
const registerUser = require('./app/routes/register')
const dashboard = require('./app/routes/dashboard')
const guestDashboard = require('./app/routes/guest-dashboard')
const searchCustomers = require('./app/routes/search_customers')

const app = express();

// AVVIO IL SERVER
app.listen(port, () => {
    console.log('Server disponibile su `http://localhost:3000`')
})

// AVVIO IL SERVER DEL DB
sequelize.authenticate().then(() => {
    console.log('Connessione al database stabilita con successo')
})
    .catch(err => {
        console.log('Errore durante la connessione', err)
    })
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// SETTO LE VIEW E IL TIPO DI ESTENSIONE
app.set('views', './app/views');
app.set('view engine', 'ejs');
// SETTO I FILE STATICI DELLA CARTELLA PUBLIC
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'app', 'public')));

app.use(flash());

// SETTO EXPRESS CON LE SESSIONI
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
    secret: 'your_secret_key',  // Modifica questo con una chiave segreta sicura
    resave: false,  // Evita di salvare la sessione se non è stata modificata
    saveUninitialized: true,  // Salva una sessione non inizializzata
    cookie: { secure: false }  // `true` se utilizzi HTTPS, `false` altrimenti
}));

// SETTO PASSPORT PER IL LOGIN
app.use(passport.initialize());
app.use(passport.session());

// UTILIZZO LE ROTTE
app.use(searchCustomers)
app.use(homeRouter)
app.use(registerUser)
app.use(loginRouter);
app.use('/user', ensureAuthenticatedUser, dashboard)
app.use('/guest', ensureAuthenticatedGuest, guestDashboard)

// Esegui la funzione updateCourseStatus ogni giorno alle 00:00
cron.schedule('30 8 * * *', async () => {
    console.log('Running the task scheduler daily at 08:30');
    await update_expirating_course_status.updateExpiratingCourseStatus()
    await update_course_scheduler.updateCourseStatus();
    await mail.sendExpiringCoursesEmail()
})