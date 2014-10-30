var zisterne = require('../../tf_modules/zisterne.js');
var express = require('express');
var router = express.Router();

var tempRoute = router.route('/temperature');
var waterLevelRoute = router.route('/waterlevel');


// Temperature API
tempRoute.get(function(req, res){
	if(global.fake === true){
		res.status(200).send({ "temperature" : 15.8 });
		return;
	}
    zisterne.readTemperature(function(err, temp){
        if(err){
            res.status(500).send({ "ERROR" : "Could not read temperature" });
            return;
        }
        res.status(200).send({ "temperature" : temp });
    });
});

// Waterlevel API
waterLevelRoute.get(function(req, res){
	if(global.fake === true){
		res.status(200).send({ "waterlevel" : 995 });
		return;
	}
    zisterne.readWaterLevel(function(err, level){
        if(err){
            res.status(500).send({ "ERROR" : "Could not read water level" });
            return;
        }
        res.status(200).send({ "waterlevel" : level });
    });
});


module.exports = router;