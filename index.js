const express = require('express');
const session = require('express-session');
const path = require('path')
const passport = require('passport');
const sequelize = require('./app/config/db-connection');
const db = require('./models/index')
const isAuth = require('./app/middleware/check-user-login');
const flash = require('connect-flash');
const scheduler = require('./app/commands/update-course-status')
const port = process.env.PORT || 3000;

const app = express();
scheduler.startScheduler()

/* router */
const loginRouter = require('./app/routes/login');
const homeRouter = require('./app/routes/home');
const registerUser = require('./app/routes/register')
const dashboard = require('./app/routes/dashboard')

app.listen(port, () => {
    console.log('Server disponibile su `http://localhost:3000`')
})

sequelize.authenticate().then(() => {
    console.log('Connessione al database stabilita con successo')
})
    .catch(err => {
        console.log('Errore durante la connessione', err)
    })
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'app', 'public')));
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
    secret: 'chiaveSegreta123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(homeRouter)
app.use(registerUser)
app.use(loginRouter);
app.use('/user', dashboard)