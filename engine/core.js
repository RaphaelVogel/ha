var logger = require('../support/logger');
var CronJob = require('cron').CronJob;
var async = require('async');
var weather = require('../access_modules/weather');
var solar = require('../access_modules/solar');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('../ha.db');


// Weather job
var jobWeather = new CronJob('00 */20 * * * *', function(){ // job starts
    logger.info("Start weather job");
    weather.readWeatherData(function(err, weatherData){
        if(err){
            logger.error("Job could not read weather data from TF");
            return;
        } else{
            logger.info("Insert the following weather data into DB: "+weatherData);
            db.run('INSERT INTO sensordata (device_id, sensor_id, val_real) VALUES (1,1,?)', [ weatherData.temperature ]);
			db.run('INSERT INTO sensordata (device_id, sensor_id, val_real) VALUES (1,2,?)', [ weatherData.humidity ]);
			db.run('INSERT INTO sensordata (device_id, sensor_id, val_real) VALUES (1,3,?)', [ weatherData.pressure ]);
        }
    });
}, 
function () { // Job has ended
    logger.info("Weather job has ended");
    db.close();
}, true);



// Solar job
var jobSolar = new CronJob('00 30 8 * * *', function(){
    logger.info("Start solar job");
    solar.readData(function(err, solarData){
        if(err){
            logger.error("Job could not read solar data");
            return;
        } else{
            logger.info("Insert the following solar data into DB: "+solarData);
            db.run('INSERT INTO sensordata (device_id, sensor_id, val_real) VALUES (2,1,?)', [ solarData.month ]);
        }        
    })
},
function(){
    logger.info("Solar job has ended");
    db.close();
}, true);



process.on('SIGINT', function() {
  db.close();
  process.exit(0);
});
process.on('SIGTERM', function() {
  db.close();
  process.exit(0);
});
