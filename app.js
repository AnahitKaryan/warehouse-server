const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { check, validationResult } = require('express-validator');

const users = require('./routers/user.routers.js');
const currentUsers = require('./routers/currentUser.routers.js');
const products = require('./routers/product.routers.js');
const shops = require('./routers/shop.routers.js');
const senders = require('./routers/sender.routers.js');
const sessions = require('./routers/sessions.routers.js');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const sessionOptions = require('./configs/config.js');
const sessionStore = require('./database/connection');
const models =  require('./db/models');
const middlewares = require('./middlewares/isUserMiddlewares');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', sessionOptions.options.origin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(session({
    key: sessionOptions.options.key,
    secret: sessionOptions.options.secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.session_id && !req.session.user) {
        res.clearCookie('session_id');
    }
    next();
});

let allowedOrigins = 'http://localhost:3000';
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
}));

app.use('/signup', users);
app.use('/signin', currentUsers);
app.use('/signout', sessions);
app.use('/products', products);
app.use('/shops', shops);
app.use('/senders', senders);

app.route('/home')
.get(middlewares.isUserMiddleware, function(request, response) {
	response.send('Welcome back!');
});

app.listen(sessionOptions.options.port, function () {
    models.sequelize.sync({force: false}).then(function () {
        console.log('Sequelize tables creates')
    });
});

module.exports = app;