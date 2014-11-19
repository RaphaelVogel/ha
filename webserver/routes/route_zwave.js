var zwave = require('../../access_modules/zwave.js');
var express = require('express');
var router = express.Router();

var livingroomLightRoute = router.route('/livingroomLight/:state');
livingroomLightRoute.get(function(req, res){
	var state = req.param('state');
    zwave.setLivingroomLight(state, function(err, zwaveData){
		if(err){
			res.status(500).send({ "ERROR" : err });
			return;
		}
		res.status(200).send(zwaveData);
    });
});

var zwaveStatusRoute = router.route('/state');
zwaveStatusRoute.get(function(req, res){
    zwave.readDevicesStatus(function(err, zwaveData){
		if(err){
			res.status(500).send({ "ERROR" : err });
			return;
		}
		res.status(200).send(zwaveData);
    });
});

module.exports = router;