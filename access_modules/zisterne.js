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
        callback("Could not open connection: "+error);        
    });

    ipcon.on(TF.IPConnection.CALLBACK_CONNECTED, function(connectReason) {
		io16Bricklet.setPortConfiguration('a', 0b00111111, 'i', true);
		var io16Bricklet.getPort('a', function(valueMask){
			if(valueMask == 63){
				zisterneData.fillingLevel = 100;
				return;
			}
			if(valueMask == 31){
				zisterneData.fillingLevel = 81-98;
				return;
			}
			if(valueMask == 15){
				zisterneData.fillingLevel = 65-81;
				return;
			}
			if(valueMask == 7){
				zisterneData.fillingLevel = 49-64;
				return;
			}
			if(valueMask == 3){
				zisterneData.fillingLevel = 32-48;
				return;
			}
			if(valueMask == 1){
				zisterneData.fillingLevel = 15-31;
				return;
			}
			if(valueMask == 0){
				zisterneData.fillingLevel = 0-14;
				return;
			}			
		});

    });
	
}
