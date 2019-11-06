const mysql = require('mysql'); 
const config = require('./../configs/dbConfig');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
    host     : config.DB_HOST,
    user     : config.DB_USER ,
    password : config.DB_PASSWORD ,
    database : config.DB_DATABASE 
}

const connection = mysql.createConnection(options);
connection.connect();
const sessionStore = new MySQLStore(options, connection);

module.exports = connection;
module.exports = sessionStore;