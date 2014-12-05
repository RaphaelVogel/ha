var logger = require('../support/logger');
var sqlite3 = require('sqlite3');

exports.readTemperatureValues = function(year, month, day, callback){
    var tempData = {"weatherValues": []};
	var sqlString;
    if(!year){
        // return average per year
        sqlString = "select strftime('%Y',timestamp) as time, avg(val_real) as temp from sensordata "+
                    "where device_id = 1 and sensor_id = 1 group by strftime('%Y',timestamp)";
        logger.verbose("Executed SQL statement to read average temperature by year: \n"+sqlString);
    }
	if(year && !month && !day){
        // return temp vales for specific year average per month
        sqlString = "select strftime('%m %Y',timestamp) as time, avg(val_real) as temp from sensordata "+
                    "where device_id = 1 and sensor_id = 1 and strftime('%Y',timestamp) = '"+year+"' group by strftime('%m %Y',timestamp)";
        logger.verbose("Executed SQL statement to read average temperature by month: \n"+sqlString);
    }
    if(year && month && !day){
        // return temp vales for specific year/month average per day
        sqlString = "select strftime('%d.%m. %Y',timestamp) as time, avg(val_real) as temp from sensordata "+
                    "where device_id = 1 and sensor_id = 1 and strftime('%Y',timestamp) = '"+year+"' and strftime('%m',timestamp) = '"+month+"' group by strftime('%d.%m. %Y',timestamp)";
        logger.verbose("Executed SQL statement to read average temperature by day: \n"+sqlString);
    }
    if(year && month && day){
        // return temp vales for specific year/month/day
        sqlString = "select strftime('%H:%M',timestamp) as time, val_real as temp from sensordata "+
                    "where device_id = 1 and sensor_id = 1 and strftime('%Y',timestamp) = '"+year+"' and strftime('%m',timestamp) = '"+month+"' and strftime('%d',timestamp) = '"+day+"'";
        logger.verbose("Executed SQL statement to read average temperature by day: \n"+sqlString);
    }
    
	var db = new sqlite3.Database('../ha.db');
    db.each(sqlString, function(err, row){
		tempData.weatherValues.push({"value": row.temp, "time": row.time});
	}, 
	function(){
        db.close();
		callback(null, tempData);
	});
}

exports.readHumidityValues = function(range, callback){
    var humidityData = {"weatherValues": []};
	if(!range) range =  1 //month
	var sqlString = "select timestamp, val_real from sensordata where device_id = 1 and sensor_id = 2 and datetime(timestamp, '+"+range+" months') >= date('now') order by timestamp asc";
	logger.verbose("Executed SQL statement to read humidity data: "+sqlString);
	var db = new sqlite3.Database('../ha.db');
    db.each(sqlString, function(err, row){
		humidityData.weatherValues.push({"humidity": row.val_real, "timestamp": row.timestamp});
	}, 
	function(){
        db.close();
		callback(null, humidityData);
	});	
}

exports.readPressureValues = function(range, callback){
    var pressureData = {"weatherValues": []};
	if(!range) range =  1 //month
	var sqlString = "select timestamp, val_real from sensordata where device_id = 1 and sensor_id = 3 and datetime(timestamp, '+"+range+" months') >= date('now') order by timestamp asc";
	logger.verbose("Executed SQL statement to read pressure data: "+sqlString);
	var db = new sqlite3.Database('../ha.db');
    db.each(sqlString, function(err, row){
		pressureData.weatherValues.push({"pressure": row.val_real, "timestamp": row.timestamp});
	}, 
	function(){
        db.close();
		callback(null, pressureData);
	});	
}