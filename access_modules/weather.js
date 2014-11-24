var async = require('async');
var TF = require('tinkerforge');
var HOST = 'zentrale1';
var PORT = 4223;

var weatherData = {
	"temperature" : "16.9", "temperatureUnit": "Grad",
	"humidity" : "43.2", "humidityUnit" : "%RH",
	"pressure" : "1013.6", "pressureUnit" : "mbar"
};

exports.readWeatherData = function(callback){
    if(global.fake === true){
		callback(null, weatherData);
		return;
	}
    var ipcon = new TF.IPConnection();
    var masterBrick = new TF.BrickMaster('6esCZX', ipcon);
    var tempBricklet = new TF.BrickletTemperature('dCf', ipcon);
    tempBricklet.setI2CMode(TF.BrickletTemperature.I2C_MODE_SLOW); // to prevent outlier
	var humidityBricklet = new TF.BrickletHumidity('', ipcon);
	var barometerBricklet = new TF.BrickletBarometer('', ipcon);
    
    ipcon.connect(HOST, PORT, function(error) {
        callback("Could not open connection to Tinkerforge: "+error);        
    });

    ipcon.on(TF.IPConnection.CALLBACK_CONNECTED, function(connectReason) {
		async.parallel([readTemperature, readHumidity, readPressure], function(err, results){
			ipcon.disconnect();
			weatherData.temperature = results[0];
			weatherData.humidity = results[1];
			weatherData.pressure = results[2];
			if(!results[0] && !results[1] && !results[2]){
				callback("Could not read any weather data");
			}
			else{
				callback(null, weatherData);
			}
		});
    });
	
	function readTemperature(cb){
		tempBricklet.getTemperature(
			function(temp) {
				cb(null, temp/100);
			},
			function(error) {
				// do not return error since then other functions are not called anymore
				cb(null, null);
			}
		);
	}
	
	function readHumidity(cb){
		humidityBricklet.getHumidity(
			function(humidity) {
				cb(null, humidity/10);
			},
			function(error) {
				cb(null, null);
			}
		);	
	}
	
	function readPressure(cb){
		barometerBricklet.getAirPressure(
			function(pressure) {
				cb(null, pressure/1000);
			},
			function(error) {
				cb(null, null);
			}
		);
	}
}
