var request = require('request');
var express = require('express');
var router = express.Router();

var livingroomLightSet = router.route('/livingroomLight/:state');
livingroomLightSet.get(function(req, res){
    if(global.fake === true){
        res.status(200).send({"livingroomLight": req.param('state')});
        return;
	}
    
    if(req.param('state') === "ON"){
        request.post({url: 'http://haserver:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchBinary.Set(255)'}, 
            function(error, response, body){
                if (error){
                    res.status(500).send({ "ERROR" : error });
                }
                else{
                    res.status(200).send({"livingroomLight":"ON"});
                }
            }
        );
    }
    else if(req.param('state') === "OFF"){
        request.post({url: 'http://haserver:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchBinary.Set(0)'}, 
            function(error, response, body){
                if (error){
                    res.status(500).send({ "ERROR" : error });
                }
                else {
                   res.status(200).send({"livingroomLight":"OFF"}); 
                }
            }
        );
    }
});

var livingroomLightGet = router.route('/livingroomLight');
livingroomLightGet.get(function(req, res){
    if(global.fake === true){
        res.status(200).send({"livingroomLight":"ON"});
        return;
	}
    
    request.post({url: 'http://haserver:8083/ZWaveAPI/Run/devices[2].instances[0].SwitchBinary.data.level.value'}, 
        function(error, response, body){
            if (error){
                res.status(500).send({ "ERROR" : error });
            }
            else {
                if(body == 'true'){
                    res.status(200).send({"livingroomLight":"ON"}); 
                }
                else {
                    res.status(200).send({"livingroomLight":"OFF"});
                }

            }
        }
    );


});

module.exports = router;
