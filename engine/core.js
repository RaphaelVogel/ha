var CronJob = require('cron').CronJob;
var async = require('async');
var weather = require('../access_modules/weather');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('../ha.db');

var jobWeather = new CronJob('00 */15 * * * *', 
    function(){ // job starts
        weather.readWeatherData(function(err, weatherData){
            if(err){
                return;
            } else{
                db.run('INSERT INTO sensordata (device_id, sensor_id, val_real) VALUES (1,1,?)', [ weatherData.temperature ]);
				db.run('INSERT INTO sensordata (device_id, sensor_id, val_real) VALUES (1,2,?)', [ weatherData.humidity ]);
				db.run('INSERT INTO sensordata (device_id, sensor_id, val_real) VALUES (1,2,?)', [ weatherData.pressure ]);
            }
        });
    }, 
    function () { // Job has ended
        db.close();
    },
    true
);

process.on('SIGINT', function() {
  db.close();
  process.exit(0);
});
process.on('SIGTERM', function() {
  db.close();
  process.exit(0);
});
