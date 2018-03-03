// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
    
// config files
var db = require('./config/db');

// set the port
var port = process.env.PORT || 3300;

// Connect to the database
db.handleDisconnect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// set the static files location
app.use(express.static(__dirname + '/public')); 
app.use(express.static(__dirname + '/node_modules'));

// configure the routes
require('./app/routes')(app);

// Start the app at http://localhost:3300
app.listen(port);
console.log('Server running on port ' + port);

// export app
exports = module.exports = app;                       