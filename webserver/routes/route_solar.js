var solar = require('../../access_modules/solar.js');
var express = require('express');
var router = express.Router();

var solarRoute = router.route('/currentData');

// Temperature API
solarRoute.get(function(req, res){
    solar.readData(function(err, solardata){
    if(err){
        res.status(500).send({ "ERROR" : err });
        return;
    }
    res.status(200).send(solardata);
    });
});

module.exports = router;