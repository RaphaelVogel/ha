var logger = require('../support/logger');
var sqlite3 = require('sqlite3');

var tempData = {"tempValues": []};
var humidityData = {"humidityValues": []};
var pressureData = {"pressureValues": []};

exports.readTemperatureValues = function(range, callback){
	if(!range) range =  1 //month
	var sqlString = "select timestamp, val_real from sensordata where device_id = 1 and sensor_id = 1 and datetime(timestamp, '+"+range+" months') >= date('now') order by timestamp asc";
	logger.verbose("Executed SQL statement to read temperature data: "+sqlString);
	var db = new sqlite3.Database('../ha.db');
    db.each(sqlString, function(err, row){
		tempData.tempValues.push({"temperature": row.val_real, "timestamp": row.timestamp});
	}, 
	function(){
        db.close();
		callback(null, tempData);
	});
}

exports.readHumidityValues = function(range, callback){
	if(!range) range =  1 //month
	var sqlString = "select timestamp, val_real from sensordata where device_id = 1 and sensor_id = 2 and datetime(timestamp, '+"+range+" months') >= date('now') order by timestamp asc";
	logger.verbose("Executed SQL statement to read humidity data: "+sqlString);
	var db = new sqlite3.Database('../ha.db');
    db.each(sqlString, function(err, row){
		humidityData.humidityValues.push({"humidity": row.val_real, "timestamp": row.timestamp});
	}, 
	function(){
        db.close();
		callback(null, humidityData);
	});	
}

exports.readPressureValues = function(range, callback){
	if(!range) range =  1 //month
	var sqlString = "select timestamp, val_real from sensordata where device_id = 1 and sensor_id = 3 and datetime(timestamp, '+"+range+" months') >= date('now') order by timestamp asc";
	logger.verbose("Executed SQL statement to read pressure data: "+sqlString);
	var db = new sqlite3.Database('../ha.db');
    db.each(sqlString, function(err, row){
		pressureData.pressureValues.push({"pressure": row.val_real, "timestamp": row.timestamp});
	}, 
	function(){
        db.close();
		callback(null, pressureData);
	});	
}