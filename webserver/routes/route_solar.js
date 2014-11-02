var solar = require('../../access_modules/solar.js');
var express = require('express');
var router = express.Router();

var solarRoute = router.route('/data');

// Temperature API
solarRoute.get(function(req, res){
    solar.readData(function(err, solardata){
    if(err){
        res.status(500).send({ "ERROR" : "Could not read current production" });
        return;
    }
    res.status(200).send(solardata);
    });
});

module.exports = router;