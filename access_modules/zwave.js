var logger = require('../support/logger');
var request = require('request');

var devicesState = {
    "livingroomLight": "OFF"
};

exports.readDevicesStatus = function(cb){
    if(global.fake === true){
        cb(null, devicesState);
        return;
	}
	
	// Read status of livingroom light
	request.post({url: 'http://haserver:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchBinary.data.level.value'}, 
        function(error, response, body){
            if (error){
                logger.error("Could not read status of living room light (binary switch)");
                cb(error);
            }
            else{
                var state = (body.toString() === "false")?"OFF":"ON";
                logger.verbose("Current state of living room light: "+state);
                cb(null, {"livingroomLight":state});
            }
        }
	);
}

exports.setLivingroomLight = function(state, cb){
    if(global.fake === true){
        cb(null, {"livingroomLight":state});
        return;
	}
    var onOff = (state === "ON")?"255":"0"
	request.post({url: 'http://haserver:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchBinary.Set('+ onOff +')'}, 
		function(error, response, body){
			if (error){
                logger.error("Could not set status "+onOff+ " of living room light (binary switch)");
				cb(error);
			}
			else{
                logger.verbose("Set new state of livingroom light to: "+onOff);
				cb(null, {"livingroomLight":state});
			}
		}
	);
}