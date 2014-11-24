var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('../../ha.db');

var tempData = {"tempValues": []};
var humidityData = {"humidityValues": []};
var presureData = {"presureValues": []};

exports.readTemperatureValues = function(maxLines, callback){
	if(!maxLines) maxLines = 33000  // approx 1 year
	db.each("select timestamp, val_real from sensordata where device_id = 1 and sensor_id = 1 limit ?", [maxLines], function(err, row){
		tempData.tempValues.push({"temperature": row.val_real, "timestamp": row.timestamp});
	});
	callback(null, tempData);
}