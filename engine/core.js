var CronJob = require('cron').CronJob;
var async = require('async');
var zisterne = require('../tf_modules/zisterne');

var jobZisterne = new CronJob('*/10 * * * * *', 
    function(){ // job starts
        zisterne.readTemperature(function(err, temp){
            if(err){
                console.log(err);
                return;
            } else{
                console.log("Temperature: "+temp);
            }
        });
           
        zisterne.readWaterLevel(function(err, level){
            if(err){
                console.log(err);
                return;
            } else{
                console.log("Water level: "+level);
            }
        });
    }, 
    function () { // Job has ended
        
    },
    true
);