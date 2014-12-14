var weather = require('../../access_modules/weather.js');
var weather_db = require('../../access_modules/weather_db.js');
var express = require('express');
var router = express.Router();

var weatherRoute = router.route('/currentData');
var historicTempRoute = router.route('/historicTemperatures');
var historicHumidityRoute = router.route('/historicHumidities');
var historicPressureRoute = router.route('/historicPressures');

weatherRoute.get(function(req, res){
    weather.readWeatherData(function(err, weatherData){
        if(err){
            res.status(500).send({ "ERROR" : err });
            return;
        }
        res.status(200).send(weatherData);
    });
});

historicTempRoute.get(function(req, res){
	var year = req.query.year;
    var month = req.query.month;
    var day = req.query.day;
    weather_db.readTemperatureValues(year, month, day, function(err, weatherData){
		if(err){
			res.status(500).send({ "ERROR" : err });
			return;
		}
        var minMax = getMinMax(weatherData.weatherValues);
        weatherData.minrange = minMax.minrange;
        weatherData.maxrange = minMax.maxrange;
		res.status(200).send(weatherData);
	});
});

historicHumidityRoute.get(function(req, res){
    var year = req.query.year;
    var month = req.query.month;
    var day = req.query.day;
	weather_db.readHumidityValues(year, month, day, function(err, weatherData){
		if(err){
			res.status(500).send({ "ERROR" : err });
			return;
		}
        var minMax = getMinMax(weatherData.weatherValues);
        weatherData.minrange = minMax.minrange;
        weatherData.maxrange = minMax.maxrange;
		res.status(200).send(weatherData);
	});
});

historicPressureRoute.get(function(req, res){
	var year = req.query.year;
    var month = req.query.month;
    var day = req.query.day;    
	weather_db.readPressureValues(year, month, day, function(err, weatherData){
		if(err){
			res.status(500).send({ "ERROR" : err });
			return;
		}
        var minMax = getMinMax(weatherData.weatherValues);
        weatherData.minrange = minMax.minrange;
        weatherData.maxrange = minMax.maxrange;
		res.status(200).send(weatherData);
	});
});

function getMinMax(values){
    var min = 1200; max = -30;
    values.forEach(function(item){
        if(item.value > max){
            max = item.value;
        }
        if(item.value < min){
            min = item.value;
        }
    });
    min = Math.round(min) - 3;
    max = Math.round(max) + 3;
    return {"minrange": min, "maxrange": max};
}

module.exports = router;