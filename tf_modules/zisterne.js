var TF = require('tinkerforge');
var HOST = 'zisterne';
var PORT = 4223;

exports.readTemperature = function(cb){
    var ipcon = new TF.IPConnection();
    ipcon.setTimeout(6000);
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
                cb(null, temp/100);
                ipcon.disconnect();
            },
            function(error) {
                cb("Could not read temperature: "+error);
                ipcon.disconnect();
            }
        );
    });
}

exports.readWaterLevel = function(cb){
    var ipcon = new TF.IPConnection();
    ipcon.setTimeout(6000);
    var masterBrick = new TF.BrickMaster('6esCZX', ipcon);
    var distUSBricklet = new TF.BrickletDistanceUS('nY3', ipcon);
    distUSBricklet.setMovingAverage(100);

    ipcon.connect(HOST, PORT, function(error) {
        cb("Could not open connection: "+error);       
    });
    
    ipcon.on(TF.IPConnection.CALLBACK_CONNECTED, function(connectReason) {
        // Get water level
        distUSBricklet.getDistanceValue(
            function(distance){
                cb(null, distance);
                ipcon.disconnect();
            },
            function(error) {
                cb("Could not read water level: "+error);
                ipcon.disconnect();
            }
        );
    });
}
