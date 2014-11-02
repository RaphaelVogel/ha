var request = require('request');

var solardata = {
    "current": "5.47",
    "currentUnit": "kW",
    "day": "7.05",
    "dayUnit": "kWh",
    "month": "34.54",
    "monthUnit": "kWh",
    "year": "10.10",
    "yearUnit": "MWh",
    "total": "31.10",
    "totalUnit": "MWh"
};

exports.readData = function(cb){
    if(global.fake === true){
        cb(null, solardata);
        return;
	}
    request.get({
        headers: {'Accept:' : '*/*'},
        url: 'http://192.168.1.19/data/ajax.txt?CAN=1&HASH=00100401&TYPE=5',
        timeout: 3000,
        auth: {
            'user': 'customer',
            'pass': '********',
            'sendImmediately': true
        }
    }, function(err, response, body){
            if(err){
                cb("Could not read data from solar inverter: "+err);
                return;
            }
            /* example body
            master;5.47 kW;5.47 kVA;0.00 kvar;7.05 kWh;7.05 kVAh;0.00 kvarh;34.54 kWh;34.54 kVAh;0.00 kvarh;10.10 MWh;10.10 MVAh;0.00 Mvarh;31.10 MWh;31.10 MVAh;0.00 Mvarh;
            1;AT 5000;2.91 kW;4.1 kWh;16.44 MWh;0055A1701029;268435492;3;00100401;0
            2;NT 4200;2.53 kW;3.4 kWh;14.66 MWh;0044A0313104;268435492;3;00200402;0
            */
            var arr = body.split(";");
            var currentData = arr[1].split(" ");
            solardata.current = currentData[0];
            solardata.currentUnit = currentData[1];
            var dayData = arr[4].split(" ");
            solardata.day = dayData[0];
            solardata.dayUnit = dayData[1];
            var monthData = arr[7].split(" ");
            solardata.month = monthData[0];
            solardata.monthUnit = monthData[1];
            var yearData = arr[10].split(" ");
            solardata.year = yearData[0];
            solardata.yearUnit = yearData[1];
            var totalData = arr[13].split(" ");
            solardata.total = totalData[0];
            solardata.totalUnit = totalData[1];
            cb(null, solardata);
        }
    );
}

