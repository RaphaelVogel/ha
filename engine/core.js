var CronJob = require('cron').CronJob;
var async = require('async');
var zisterne = require('../tf_modules/zisterne');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('../ha.data');

var jobZisterne = new CronJob('00 */20 * * * *', 
    function(){ // job starts
        zisterne.readTemperature(function(err, temp){
            if(err){
                console.log(err);
                return;
            } else{
                db.run('INSERT INTO sensordata (device_id, sensor_id, val_real) VALUES (1,1,?)', [ temp ]);
            }
        });
        zisterne.readWaterLevel(function(err, level){
            if(err){
                console.log(err);
                return;
            } else{
                db.run('INSERT INTO sensordata (device_id, sensor_id, val_int) VALUES (1,2,?)', [ level ]);
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