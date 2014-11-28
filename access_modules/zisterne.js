var logger = require('../support/logger');
var TF = require('tinkerforge');
var HOST = 'zentrale1';
var PORT = 4223;

var zisterneData = {
	"fillingLevel" : "82.5", "fillingLevelUnit": "%"
};

exports.readZisterneData = function(callback){
    if(global.fake === true){
		callback(null, zisterneData);
		return;
	}
    var ipcon = new TF.IPConnection();
    var masterBrick = new TF.BrickMaster('6esCZX', ipcon);
	var io16Bricklet = new Tinkerforge.BrickletIO16('', ipcon);
    
    ipcon.connect(HOST, PORT, function(error) {
    	logger.error("Could not open connection to Tinkerforge: "+error);
        callback("Could not open connection: "+error);        
    });

    ipcon.on(TF.IPConnection.CALLBACK_CONNECTED, function(connectReason) {
		io16Bricklet.setPortConfiguration('a', 0b00111111, 'i', true);
		var io16Bricklet.getPort('a', function(valueMask){
			if(valueMask == 63){
				logger.verbose("6 water level swiches triggered");
				zisterneData.fillingLevel = 100;
				return;
			}
			if(valueMask == 31){
				logger.verbose("5 water level swiches triggered");
				zisterneData.fillingLevel = 81-98;
				return;
			}
			if(valueMask == 15){
				logger.verbose("4 water level swiches triggered");
				zisterneData.fillingLevel = 65-81;
				return;
			}
			if(valueMask == 7){
				logger.verbose("3 water level swiches triggered");
				zisterneData.fillingLevel = 49-64;
				return;
			}
			if(valueMask == 3){
				logger.verbose("2 water level swiches triggered");
				zisterneData.fillingLevel = 32-48;
				return;
			}
			if(valueMask == 1){
				logger.verbose("1 water level swiche triggered");
				zisterneData.fillingLevel = 15-31;
				return;
			}
			if(valueMask == 0){
				logger.verbose("no water level swiches triggered");
				zisterneData.fillingLevel = 0-14;
				return;
			}			
		});

    });
	
}
