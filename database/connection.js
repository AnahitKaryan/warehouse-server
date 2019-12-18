const mysql = require('mysql');
const env = process.env.NODE_ENV || 'development';
const config = require('./../config/config.json')[env];
const log = require('./../config/logs');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
    host     : config.host,
    user     : config.username,
    password : config.password,
    database : config.database
}

const connection = mysql.createConnection(options);

connection.connect((err) => {
    if(err){
        log.info('Error connecting to Db');
        return;
    }
    log.info('Connection established');
});

const sessionStore = new MySQLStore(options, connection);

module.exports = connection;
module.exports = sessionStore;