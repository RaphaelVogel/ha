var solar = require('../../access_modules/solar.js');
var solar_db = require('../../access_modules/solar_db.js');
var express = require('express');
var router = express.Router();

var solarRoute = router.route('/currentData');
var historicSolarRoute = router.route('/historicProductionData');

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

historicSolarRoute.get(function(req, res){
	solar_db.readProductionPerDay(1, function(err, solarData){
		if(err){
			res.status(500).send({ "ERROR" : err });
			return;
		}
		res.status(200).send(solarData);
	});
});

module.exports = router;