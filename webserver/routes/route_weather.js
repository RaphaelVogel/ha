var weather = require('../../access_modules/weather.js');
var express = require('express');
var router = express.Router();

var weatherRoute = router.route('/data');

// Temperature API
weatherRoute.get(function(req, res){
    weather.readWeatherData(function(err, weatherData){
        if(err){
            res.status(500).send({ "ERROR" : err });
            return;
        }
        res.status(200).send(weatherData);
    });
});

module.exports = router;