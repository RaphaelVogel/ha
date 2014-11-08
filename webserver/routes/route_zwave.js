var express = require('express');
var router = express.Router();

var livingroomLightRoute = router.route('/livingroomLight/:state');

// Temperature API
livingroomLightRoute.get(function(req, res){
    if(req.param('state') === "ON"){
        //http://raspi1:8083/ZWaveAPI/Run/devices[2].instances[1].SwitchBinary.Set(255)
        request.post({url: 'http://haserver:8083/ZWaveAPI/Run/devices[2].instances[1].SwitchBinary.Set(255)'}, 
            function(error, response, body){
                
            }
        );
    }
    else if(req.param('state') === "OFF"){
        request.post({url: 'http://haserver:8083/ZWaveAPI/Run/devices[2].instances[1].SwitchBinary.Set(0)'}, 
            function(error, response, body){
                console.log(body);
            }
        );
    }
});

module.exports = router;

/*
ON
{
    "devices.2.data.lastReceived": {
      "name": "lastReceived",
      "value": 0,
      "type": "int",
      "invalidateTime": 1415390696,
      "updateTime": 1415393915
    },
    "devices.2.instances.0.commandClasses.37.data.level": {
      "name": "level",
      "value": true,
      "type": "bool",
      "invalidateTime": 1415393766,
      "updateTime": 1415393915
    },
  "updateTime": 1415393917
}

OFF
{
    "devices.2.data.lastReceived": {
      "name": "lastReceived",
      "value": 0,
      "type": "int",
      "invalidateTime": 1415390696,
      "updateTime": 1415394083
    },
    "devices.2.instances.0.commandClasses.37.data.level": {
      "name": "level",
      "value": false,
      "type": "bool",
      "invalidateTime": 1415393766,
      "updateTime": 1415394083
    },
  "updateTime": 1415394085
}
*/