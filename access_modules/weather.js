var logger = require('../support/logger');
var async = require('async');
var TF = require('tinkerforge');
var HOST = 'busmaster';
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
    var masterBrick = new TF.BrickMaster('6rkQPB', ipcon);
    var tempBricklet = new TF.BrickletTemperature('qnk', ipcon);
    tempBricklet.setI2CMode(TF.BrickletTemperature.I2C_MODE_SLOW); // to prevent outlier
	var humidityBricklet = new TF.BrickletHumidity('nLC', ipcon);
	var barometerBricklet = new TF.BrickletBarometer('k5g', ipcon);
    
    ipcon.connect(HOST, PORT, function(error) {
    	logger.error("Could not open connection to Tinkerforge: "+error);
        callback("Could not open connection to Tinkerforge: "+error);        
    });

    ipcon.on(TF.IPConnection.CALLBACK_CONNECTED, function(connectReason) {
		async.parallel([readTemperature, readHumidity, readPressure], function(err, results){
			ipcon.disconnect();
			weatherData.temperature = results[0];
			weatherData.humidity = results[1];
			weatherData.pressure = results[2];
			if(!results[0] && !results[1] && !results[2]){
				logger.error("Could not read any weather data at all from TF");
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
				logger.error("Could not read temperature value from TF: "+error);
				// do not return error since then other functions are not called anymore
				cb(null, null);
			}
		);
	}
	
	function readHumidity(cb){
		humidityBricklet.getHumidity(
			function(humidity) {
                if((humidity/10) < 5){
                    // outlier, ignore
                    logger.warn("Read humidity which is out of range (< 5 %RH): "+error);
                    cb(null, null);
                    return;
                }
				cb(null, humidity/10);
			},
			function(error) {
				logger.error("Could not read humidity value from TF: "+error);
				cb(null, null);
			}
		);	
	}
	
	function readPressure(cb){
		barometerBricklet.getAirPressure(
			function(pressure) {
                if((pressure/1000) < 930 || (pressure/1000) > 1100){
                    // outlier, ignore
                    logger.warn("Read air pressure which is out of range (< 930 mBar or > 1100 mBar): "+error);
                    cb(null, null);
                    return;
                }
				cb(null, pressure/1000);
			},
			function(error) {
				logger.error("Could not read air pressure value from TF: "+error);
				cb(null, null);
			}
		);
	}
}
