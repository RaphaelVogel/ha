var logger = require('../support/logger');
var express = require('express'),
    app = express();

global.fake = false;

// REPL server
var repl = require('repl')
var net = require('net')
 
net.createServer(function (socket) {
	var r = repl.start({
		prompt: 'socket '+socket.remoteAddress+':'+socket.remotePort+'> ',
		input: socket,
		output: socket,
		terminal: true,
		useGlobal: false
	});
	r.on('exit', function () {
		socket.end()
	});
	r.context.socket = socket;
	r.context.logger = logger;
}).listen(1337) 
console.log('Repl Server listening on port 1337');



// Express Web Server
var weather = require('./routes/route_weather.js');
app.use('/weather', weather);

var solar = require('./routes/route_solar.js');
app.use('/solar', solar);

var zwave = require('./routes/route_zwave.js');
app.use('/zwave', zwave);

// redirect root access to index.html
app.get("/", function (req, res) {
  res.redirect("/index.html");
});

// register middleware
app.use(express.static(__dirname + '/'));

app.listen(8080);
console.log('Web Server listening on port 8080');
console.log('Debug level set to: '+logger.transports.file.level);