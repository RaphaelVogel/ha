var CronJob = require('cron').CronJob;
var async = require('async');
var zisterne = require('../tf_modules/zisterne');

var jobZisterneTemperature = new CronJob('*/10 * * * * *', 
    function(){ // job starts
        zisterne.readTemperature(function(err, temp){
            if(err){
                console.log(err);
                return;
            } else{
                console.log("Temperature: "+temp);
                //cb(null);
            }
        });
           
        zisterne.readWaterLevel(function(err, level){
            if(err){
                console.log(err);
                return;
            } else{
                console.log("Water level: "+level);
                //cb(null);
            }
        });
    }, 
    function () { // Job has ended
        
    },
    true
);