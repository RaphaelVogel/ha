var TF = require('tinkerforge');
var HOST = 'zisterne';
var PORT = 4223;

exports.readTemperature = function(cb){
    if(global.fake === true){
		cb(null, {"temperature" : "16.8", "temperatureUnit": "Grad" });
		return;
	}
    var ipcon = new TF.IPConnection();
    ipcon.setTimeout(3000);
    var masterBrick = new TF.BrickMaster('6esCZX', ipcon);
    var tempBricklet = new TF.BrickletTemperature('dCf', ipcon);
    tempBricklet.setI2CMode(TF.BrickletTemperature.I2C_MODE_SLOW); // to prevent outlier
    
    ipcon.connect(HOST, PORT, function(error) {
        cb("Could not open connection: "+error);        
    });

    ipcon.on(TF.IPConnection.CALLBACK_CONNECTED, function(connectReason) {
        // Get temperature
        tempBricklet.getTemperature(
            function(temp) {
                cb(null, {"temperature": temp/100, "temperatureUnit": "Grad"});
                ipcon.disconnect();
            },
            function(error) {
                cb("Could not read temperature: "+error);
                ipcon.disconnect();
            }
        );
    });
}
