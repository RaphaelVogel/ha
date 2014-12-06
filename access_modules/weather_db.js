var logger = require('../support/logger');
var sqlite3 = require('sqlite3');

exports.readTemperatureValues = function(year, month, day, callback){
    var tempData = {"weatherValues": []};
	var sqlString;
    if(!year){
        // return average per year
        sqlString = "select strftime('%Y',timestamp) as time, round(avg(val_real),2) as value from sensordata "+
                    "where device_id = 1 and sensor_id = 1 group by strftime('%Y',timestamp)";
        logger.verbose("Executed SQL statement to read average temperature by year: \n"+sqlString);
    }
	if(year && !month && !day){
        // return temp vales for specific year average per month
        sqlString = "select strftime('%m %Y',timestamp) as time, round(avg(val_real),2) as value from sensordata "+
                    "where device_id = 1 and sensor_id = 1 and strftime('%Y',timestamp) = '"+year+"' group by strftime('%m %Y',timestamp)";
        logger.verbose("Executed SQL statement to read average temperature by month: \n"+sqlString);
    }
    if(year && month && !day){
        // return temp vales for specific year/month average per day
        sqlString = "select strftime('%d.%m. %Y',timestamp) as time, round(avg(val_real),2) as value from sensordata "+
                    "where device_id = 1 and sensor_id = 1 and strftime('%Y',timestamp) = '"+year+"' and strftime('%m',timestamp) = '"+month+"' group by strftime('%d.%m. %Y',timestamp)";
        logger.verbose("Executed SQL statement to read average temperature by day: \n"+sqlString);
    }
    if(year && month && day){
        // return temp vales for specific year/month/day 3 values per hour
        sqlString = "select strftime('%H:%M',timestamp) as time, val_real as value from sensordata "+
                    "where device_id = 1 and sensor_id = 1 and strftime('%Y',timestamp) = '"+year+"' and strftime('%m',timestamp) = '"+month+"' and strftime('%d',timestamp) = '"+day+"'";
        logger.verbose("Executed SQL statement to read temperature 3 times a hour: \n"+sqlString);
    }
    
	var db = new sqlite3.Database('../ha.db');
    db.each(sqlString, function(err, row){
		tempData.weatherValues.push({"value": row.value, "time": row.time});
	}, 
	function(){
        db.close();
		callback(null, tempData);
	});
}

exports.readHumidityValues = function(year, month, day, callback){
    var humidityData = {"weatherValues": []};
	var sqlString;
    if(!year){
        // return average per year
        sqlString = "select strftime('%Y',timestamp) as time, round(avg(val_real),2) as value from sensordata "+
                    "where device_id = 1 and sensor_id = 2 group by strftime('%Y',timestamp)";
        logger.verbose("Executed SQL statement to read average humidity by year: \n"+sqlString);
    }
	if(year && !month && !day){
        // return temp vales for specific year average per month
        sqlString = "select strftime('%m %Y',timestamp) as time, round(avg(val_real),2) as value from sensordata "+
                    "where device_id = 1 and sensor_id = 2 and strftime('%Y',timestamp) = '"+year+"' group by strftime('%m %Y',timestamp)";
        logger.verbose("Executed SQL statement to read average humidity by month: \n"+sqlString);
    }
    if(year && month && !day){
        // return temp vales for specific year/month average per day
        sqlString = "select strftime('%d.%m. %Y',timestamp) as time, round(avg(val_real),2) as value from sensordata "+
                    "where device_id = 1 and sensor_id = 2 and strftime('%Y',timestamp) = '"+year+"' and strftime('%m',timestamp) = '"+month+"' group by strftime('%d.%m. %Y',timestamp)";
        logger.verbose("Executed SQL statement to read average humidity by day: \n"+sqlString);
    }
    if(year && month && day){
        // return temp vales for specific year/month/day 3 values per hour
        sqlString = "select strftime('%H:%M',timestamp) as time, val_real as value from sensordata "+
                    "where device_id = 1 and sensor_id = 2 and strftime('%Y',timestamp) = '"+year+"' and strftime('%m',timestamp) = '"+month+"' and strftime('%d',timestamp) = '"+day+"'";
        logger.verbose("Executed SQL statement to read humidity 3 times a hour: \n"+sqlString);
    }
    
	var db = new sqlite3.Database('../ha.db');
    db.each(sqlString, function(err, row){
		humidityData.weatherValues.push({"value": row.value, "time": row.time});
	}, 
	function(){
        db.close();
		callback(null, humidityData);
	});
}

exports.readPressureValues = function(year, month, day, callback){
    var pressureData = {"weatherValues": []};
	var sqlString;
    if(!year){
        // return average per year
        sqlString = "select strftime('%Y',timestamp) as time, round(avg(val_real),2) as value from sensordata "+
                    "where device_id = 1 and sensor_id = 3 group by strftime('%Y',timestamp)";
        logger.verbose("Executed SQL statement to read average pressure by year: \n"+sqlString);
    }
	if(year && !month && !day){
        // return temp vales for specific year average per month
        sqlString = "select strftime('%m %Y',timestamp) as time, round(avg(val_real),2) as value from sensordata "+
                    "where device_id = 1 and sensor_id = 3 and strftime('%Y',timestamp) = '"+year+"' group by strftime('%m %Y',timestamp)";
        logger.verbose("Executed SQL statement to read average pressure by month: \n"+sqlString);
    }
    if(year && month && !day){
        // return temp vales for specific year/month average per day
        sqlString = "select strftime('%d.%m. %Y',timestamp) as time, round(avg(val_real),2) as value from sensordata "+
                    "where device_id = 1 and sensor_id = 3 and strftime('%Y',timestamp) = '"+year+"' and strftime('%m',timestamp) = '"+month+"' group by strftime('%d.%m. %Y',timestamp)";
        logger.verbose("Executed SQL statement to read average pressure by day: \n"+sqlString);
    }
    if(year && month && day){
        // return temp vales for specific year/month/day 3 values per hour
        sqlString = "select strftime('%H:%M',timestamp) as time, val_real as value from sensordata "+
                    "where device_id = 1 and sensor_id = 3 and strftime('%Y',timestamp) = '"+year+"' and strftime('%m',timestamp) = '"+month+"' and strftime('%d',timestamp) = '"+day+"'";
        logger.verbose("Executed SQL statement to read humidity 3 times a hour: \n"+sqlString);
    }
    
	var db = new sqlite3.Database('../ha.db');
    db.each(sqlString, function(err, row){
		pressureData.weatherValues.push({"value": row.value, "time": row.time});
	}, 
	function(){
        db.close();
		callback(null, pressureData);
	});
}