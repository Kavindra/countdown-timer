// Get the conference model
var conference = require('./models/conference');
var moment = require('../node_modules/moment-timezone');

    module.exports = function(app) {

        /*
        * GET countdown: Get the list of upcoming conference data.
        * */
        app.get('/api/countdown', function(req, res) {
            conference.listConf(function(err, conf) {
                if (err){
                    console.log(err);
                    res.send(err);
                }
                // Convert time into Sydney time.
                for(var i = 0; i < conf.response.length; i++) {
                    conf.response[i].date = moment(conf.response[i].date).add(11, 'hours')
                }
                res.json(conf);
            });
        });

        /*
        * POST countdown: Save entry data in the database.
        * */
        app.post('/api/countdown', function(req, res) {
            var confData = {
                conf_name: req.body[0].name,
                abbr: req.body[0].abbr,
                date: req.body[0].date
            };
            conference.saveConf(confData, function(err, result) {
                if (err){
                    res.send(err);
                }
                res.json(result);
            });
        });

        /*
        * GET submission: Get the last submitted paper
        * */
        app.get('/api/submission', function(req, res) {
            conference.getLastSubmission(function(err, paper) {
                if (err){
                    console.log(err);
                    res.send(err);
                }
                res.json(paper);
            });

        });

        /*
        * POST submission: Save the last submitted paper.
        * */
        app.post('/api/submission', function(req, res) {
            var confData = {
                name: req.body[0].name,
                abbr: req.body[0].abbr,
                date: req.body[0].date
            };
            conference.saveSubmission(confData, function(err, result) {
                if (err){
                    res.send(err);
                }
                res.json(result);
            });
        });

        // Frontend routes
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html');
        });

    };
