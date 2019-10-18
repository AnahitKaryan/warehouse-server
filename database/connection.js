const mysql = require('mysql'); 
const config = require('./../configs/dbConfig');

const connection = mysql.createConnection({
    host     : config.DB_HOST,
    user     : config.DB_USER ,
    password : config.DB_PASSWORD ,
    database : config.DB_DATABASE 
});
 
connection.connect();
module.exports = connection;