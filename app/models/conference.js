// Importing dependencies.
var mysql = require('mysql');
var db = require('../../config/db');
var moment = require('../../node_modules/moment-timezone');

/*
* Save conference data in the mysql database.
* */
var saveConf = function (data) {
    var sql = "INSERT INTO conference (conf_name, abbr, date) VALUES ('" + data.conf_name + "','" + data.abbr + "','" + data.date + "')";
    db.con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        console.log(result);
    });
};

/*
* Get the list of upcoming conferences from the database.
* */
var listConf = function (cb) {
    var today = new Date().toISOString();
    var sql = "SELECT * FROM conference WHERE date > '" + today + "'";
    var res = {};
    db.con.query(sql, function (err, rows) {
        if (err) { cb(err); }
        cb(null, {
            success: true,
            response: rows
        });
    });
};

/*
* Save last submitted paper in the database.
* */
var saveSubmission = function (data) {
    var sql = "INSERT INTO submissions (name, abbr, date) VALUES ('" + data.name + "','" + data.abbr + "','" + data.date + "')";
    db.con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        console.log(result);
    });
};

/*
* Get the last submitted paper's data from the database.
* */
var getLastSubmission = function (cb) {
    var today = new Date().toISOString();
    var sql = "SELECT * FROM submissions WHERE id IN (SELECT id FROM submissions WHERE date = (SELECT MAX(date) FROM submissions)) ORDER BY id DESC LIMIT 1";
    var res = {};
    db.con.query(sql, function (err, rows) {
        if (err) { cb(err); }
        cb(null, {
            success: true,
            response: rows
        });
    });
};

module.exports = {
    saveConf: saveConf,
    listConf: listConf,
    saveSubmission: saveSubmission,
    getLastSubmission: getLastSubmission
};