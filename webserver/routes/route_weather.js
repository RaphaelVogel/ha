var weather = require('../../access_modules/weather.js');
var express = require('express');
var router = express.Router();

var tempRoute = router.route('/temperature');

// Temperature API
tempRoute.get(function(req, res){
    weather.readTemperature(function(err, tempdata){
        if(err){
            res.status(500).send({ "ERROR" : err });
            return;
        }
        res.status(200).send(tempdata);
    });
});

module.exports = router;