var request = require('request');

var devicesState = {
    "livingroomLight": "OFF"
};

exports.readDevicesStatus = function(cb){
    if(global.fake === true){
        cb(null, devicesState);
        return;
	}
	
	// Read complete status of all zwave sensors/actors    
	// request.post({url: 'http://haserver:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchBinary.data.level.value'}, 
	
}

exports.setLivingroomLight = function(state, cb){
    if(global.fake === true){
        cb(null, {"livingroomLight":state});
        return;
	}
	request.post({url: 'http://haserver:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchBinary.Set('+(state === "ON")?"255":"0"+')'}, 
		function(error, response, body){
			if (error){
				cb(error);
			}
			else{
				cb(null, {"livingroomLight":state});
			}
		}
	);
}