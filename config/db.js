// Import MySQL
var mysql = require('mysql');

// Database configuration object.
var db_config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'countdowndb'
};

// Make the database connection.
var con = mysql.createConnection(db_config);

var connection;

/*
* Handle random disconnections of the database
* */
var handleDisconnect = function() {
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
};

module.exports = {
    handleDisconnect : handleDisconnect,
    con: con
};