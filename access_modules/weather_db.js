var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('../ha.db');

var tempData = {"tempValues": []};
var humidityData = {"humidityValues": []};
var pressureData = {"pressureValues": []};

exports.readTemperatureValues = function(range, callback){
	if(!range) range =  1 //month
	var sqlString = "select timestamp, val_real from sensordata where device_id = 1 and sensor_id = 1 and datetime(timestamp, '+"+range+" months') >= date('now') order by timestamp asc"; //
	db.each(sqlString, function(err, row){
		tempData.tempValues.push({"temperature": row.val_real, "timestamp": row.timestamp});
	}, 
	function(){
		callback(null, tempData);
	});
	
}