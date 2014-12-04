var logger = require('../support/logger');
var sqlite3 = require('sqlite3');

exports.readProductionPerDay = function(range, callback){
    var solarData = { "days": []};
	if(!range) range =  1 //month
    var db = new sqlite3.Database('../ha.db');
	var sqlString = "select timestamp, val_real from sensordata where device_id = 2 and sensor_id = 1 and datetime(timestamp, '+"+range+" months') >= date('now') order by timestamp asc"; //
	logger.verbose("Executed SQL statement to read solar data: "+sqlString);
	db.each(sqlString, function(err, row){
		solarData.days.push({"dayproduction": row.val_real, "timestamp": row.timestamp});
	}, 
	function(){
        db.close();
		callback(null, solarData);
	});
	
}