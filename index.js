const express = require('express');
const session = require('express-session');
const passport = require('passport');
const sequelize = require('./app/config/db-connection');
const db = require('./models/index')
const checkUserLogin = require('./app/middleware/check-user-login');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

/* router */
const loginRouter = require('./app/routes/login');
const userRouter = require('./app/routes/user');

app.listen(port, () => {
    console.log('Server disponibile su `http://localhost:3000`')
})

sequelize.sync()
    .then(() => {
        console.log('Tabella users creata con successo')
    })
    .catch(err => {
        console.log('Errore durante la creazione della tabella')
    })


sequelize.authenticate().then(() => {
    console.log('Connessione al database stabilita con successo')
})
    .catch(err => {
        console.log('Errore durante la connessione', err)
    })

app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'chiaveSegreta123',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(loginRouter);
app.use('/user', checkUserLogin(), userRouter);